import React, {useEffect, useState} from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'REPLACE_ME',
  authDomain: 'REPLACE_ME',
  projectId: 'REPLACE_ME',
};

initializeApp(firebaseConfig);
const db = getFirestore();

export default function App(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    const q = query(collection(db, 'orders'));
    const unsub = onSnapshot(q, (snap)=>{
      const data = [];
      snap.forEach(doc => data.push({id: doc.id, ...doc.data()}));
      setOrders(data);
    });
    return ()=>unsub();
  },[]);
  return (
    <div style={{padding:20, fontFamily: 'sans-serif'}}>
      <h1>Klan Energy — Admin</h1>
      <table border="1" cellPadding="8" style={{borderCollapse:'collapse', width:'100%'}}>
        <thead><tr><th>Order ID</th><th>User</th><th>Service</th><th>Status</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.uid || o.userEmail || '—'}</td>
              <td>{o.serviceType || o.items?.map(i=>i.title).join(', ')}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
