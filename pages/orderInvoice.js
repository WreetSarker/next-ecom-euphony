import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';

function OrderInvoice() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const itemsBought = cart.cartItems;
  const shippingAddress = cart.shippingAddress;
  const router = useRouter();
  console.log(shippingAddress);

  return (
    <Layout title="Order Details">
      <h1>Order Details</h1>
      {shippingAddress === '' ? (
        <div>
          Cart is Empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {itemsBought.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div>
        <h1 className="mt-20 text-large text-center">Shipping Details</h1>
        <div className="card">
          <p>Customer Name: {shippingAddress.fullName}</p>
          <p>City: {shippingAddress.city}</p>
          <p>Country: {shippingAddress.country}</p>
          <p>Adress: {shippingAddress.address}</p>
          <p>Post Code: {shippingAddress.postalCode}</p>
          <br />
          <br />
          <p>
            Total Payable Amount: ${' '}
            {itemsBought.reduce((a, c) => a + c.quantity * c.price, 0)}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(OrderInvoice), { ssr: false });
