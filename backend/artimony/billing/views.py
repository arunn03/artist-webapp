# billing/views.py

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

@method_decorator(csrf_exempt, name='dispatch')
class CreateSubscriptionView(APIView):
    def post(self, request, *args, **kwargs):
        # try:
            data = request.data
            email = data.get('email')
            payment_method_id = data.get('paymentMethodId')
            address = data.get('address')

            # Create a customer in Stripe
            customer = stripe.Customer.create(
                email=email,
                payment_method=payment_method_id,
                invoice_settings={'default_payment_method': payment_method_id},
                address={
                    'line1': address['line1'],
                    'line2': address.get('line2', ''),
                    'city': address['city'],
                    'state': address['state'],
                    'postal_code': address['postal_code'],
                    'country': address['country']
                }
            )

            # Create a subscription using the Price ID
            subscription = stripe.Subscription.create(
                customer=customer.id,
                items=[{'price': 'price_1PI4y1SHZ40qVXEpHxD4FJlM'}],  # Replace with your actual price ID
                expand=['latest_invoice.payment_intent'],
            )

            payment_intent = subscription.latest_invoice.payment_intent
            if payment_intent and payment_intent.status == 'requires_action':
                print("Payment intent requires action")
                return Response({'client_secret': payment_intent.client_secret, 'status': subscription.status})

            return Response(subscription, status=status.HTTP_201_CREATED)
        # except Exception as e:
        #     return Response({'error': {'message': str(e)}}, status=status.HTTP_400_BAD_REQUEST)
