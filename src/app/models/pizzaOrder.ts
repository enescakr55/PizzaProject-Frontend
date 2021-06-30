import { CreditCard } from './creditCard';
import { OrderHelper } from './orderHelper';
import { Order } from './order';
export interface PizzaOrder {
    order:Order,
    orderHelpers:OrderHelper[],
    creditCard:CreditCard;

}