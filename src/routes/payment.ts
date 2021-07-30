import {Router} from 'express'
import Stripe from 'stripe';
import config from '../lib/config';
import Clase from '../models/Clase';
const stripe = new Stripe(config.privateApiKey, null);
const router = Router()
router.post('/procesarpago', async (req, res) => {
    const { clasesPorComprar, moneda, cliente } = req.body;
    let clases = clasesPorComprar.map(e => {
      var nuevoElemento = {
        price_data: {
          currency: moneda,
          product_data: {
            metadata: { id: e.id},
            name: e.nombre,
            images: [e.imagen],
            description: `PROFESOR > ${e.profesor} | DIA > ${e.dia} | HORA INICIO > ${e.horaInicio} | HORA FIN > ${e.horaFin}`
          },
          unit_amount: e.precioDescuento * 100,
        },
        quantity: 1,
      }
      return nuevoElemento;
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: clases,
      customer_email: cliente,
      mode: 'payment',
      success_url: 'http://localhost:3000/pagoexitoso?id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cesta',
    });

    

    res.send({id: session.id})
  });
  
  router.get('/informaciondepago/:id', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {expand: ['line_items', 'line_items.data.price.product', 'customer']})
    res.send(session)
  })

export default router