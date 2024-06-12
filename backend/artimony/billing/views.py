from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import razorpay
from .models import *
import requests

razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

# @method_decorator(csrf_exempt, name='dispatch')
class CreateSubscriptionView(APIView):
    def post(self, request):
        # try:
            data = request.data
            name = data.get('name')
            email = data.get('email')
            contact = data.get('contact')
            address = data.get('address')
            plan = data.get('plan')

            address_str = f"{address['line1']}, {address.get('line2', '')}, {address['city']}, {address['state']} - {address['postal_code']}, {address['country']}"

            # Check if customer already exists
            customers = razorpay_client.customer.all()
            customer = next((c for c in customers['items'] if c['email'] == email), None)
            if not customer:
                # Create a new customer if not found
                customer = razorpay_client.customer.create({
                    "name": name,
                    "email": email,
                    "contact": contact,
                    "fail_existing": 0
                })

            # Check if customer already has an active subscription
            subscriptions = razorpay_client.subscription.all()
            active_subscription = next((sub for sub in subscriptions['items'] if sub['status'] in ['created', 'active'] and sub['customer_id'] == customer['id']), None)
            if active_subscription:
                if active_subscription['status'] == 'created':
                    return Response(active_subscription, status=status.HTTP_201_CREATED)
                return Response({'message': 'Customer already has an active subscription'}, status=status.HTTP_200_OK)
            
            # Create a subscription
            subscription = razorpay_client.subscription.create({
                "plan_id": plan,  # Replace with your actual Razorpay plan ID from settings
                "customer_notify": 1,
                "quantity": 1,
                "customer_id": customer['id'],
                "addons": [],
                "total_count": 2000,
                # "notes": {

                # }
            })

            billing_profile = get_object_or_404(BillingProfile, user=request.user)

            if not billing_profile:
                billing_profile = BillingProfile.objects.create(
                    user=request.user,
                    address=address_str,
                    subscription_id=subscription['id'],
                    plan=plan,
                    subscription_status='created'
                )
            else:
                billing_profile.subscription_id = subscription['id']
                billing_profile.plan = plan
                billing_profile.subscription_status = 'created'
            billing_profile.save()

            return Response(subscription, status=status.HTTP_201_CREATED)
        # except Exception as e:
        #     return Response({'error': {'message': str(e)}}, status=status.HTTP_400_BAD_REQUEST)

class UpdateSubscriptionView(APIView):
    def post(self, request):
        # try:
            data = request.data
            billingprofile = get_object_or_404(BillingProfile, user=request.user)
            if not billingprofile:
                return Response({'error': {'message': 'No billing profile found'}}, status=status.HTTP_400_BAD_REQUEST)
            subscription_id = billingprofile.subscription_id
            plan = data.get('plan')

            url = 'https://api.razorpay.com/v1/subscriptions/' + subscription_id

            payload = {
                'plan_id': plan,
                'schedule_change_at': 'cycle_end',
                'customer_notify': 1,
            }

            headers = {
                'Content-Type': 'application/json',
            }

            auth = (settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)

            # Update the subscription
            response = requests.patch(url, json=payload, headers=headers, auth=auth)
            if response.status_code == 200:

                billingprofile.plan = plan
                billingprofile.save()

                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response(response.json(), status=status.HTTP_400_BAD_REQUEST)
        # except Exception as e:
        #     return Response({'error': {'message': str(e)}}, status=status.HTTP_400_BAD_REQUEST)


class CancelSubscriptionView(APIView):
    def post(self, request):
        try:
            billing_profile = get_object_or_404(BillingProfile, user=request.user)
            subscription_id = billing_profile.subscription_id

            # Cancel the subscription
            response = razorpay_client.subscription.cancel(subscription_id, {
                "cancel_at_cycle_end": 0
            })

            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': {'message': str(e)}}, status=status.HTTP_400_BAD_REQUEST)

class WebHookView(APIView):
      
    def post(self, request):
        data = request.data
        subscription_id = data['payload']['subscription']['entity']['id']
        subscription_status = data['payload']['subscription']['entity']['status']
        billing_profile = BillingProfile.objects.filter(subscription_id__exact=subscription_id)
        billing_profile.update(subscription_status=subscription_status)
        return Response(status=status.HTTP_200_OK)
