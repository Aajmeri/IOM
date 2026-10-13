import { Order, Receipt } from '../app/services/order.service';

/** Shared test data for receipt/checkout specs. */
export const sampleReceipt: Receipt = {
  orderId: 'order-1',
  orderNumber: 'ORD-20261012100000',
  orderStatus: 'Pending',
  orderDate: '2026-10-12T10:00:00Z',
  scheduledDate: '2026-10-15T08:00:00',
  clientName: 'Jane Client',
  clientEmail: 'jane@example.com',
  notes: null,
  items: [{ productId: 'p1', productName: 'Widget', quantity: 2, unitPrice: 10 }],
  total: 20,
  paymentStatus: 'Paid',
  paymentMethod: 'Card',
  cardBrand: 'Visa',
  cardLast4: '4242',
  cardholderName: 'Jane Client',
  transactionId: 'SIM-TXN',
  amountPaid: 20,
  paidDate: '2026-10-12T10:00:00Z',
  refundedDate: null,
  emailedTo: 'jane@example.com'
};

/** An unpaid (pay-later) pending order. */
export const sampleOrder: Order = {
  id: 'order-1',
  number: 'ORD-20261012100000',
  clientId: 'client-1',
  clientName: 'Jane Client',
  scheduledDate: '2026-10-15T08:00:00',
  status: 'Pending',
  notes: null,
  adminNotes: null,
  total: 20,
  createdDate: '2026-10-12T10:00:00Z',
  paymentStatus: 'Unpaid',
  items: [{ productId: 'p1', productName: 'Widget', quantity: 2, unitPrice: 10 }]
};
