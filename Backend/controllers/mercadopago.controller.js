const mercadopago = require("mercadopago");
const mercadopagoCtrl = {};
const client = new mercadopago.MercadoPagoConfig({
  accessToken:
    "TEST-6151281096348174-070918-57d90fef3a37b1e3681003e18f067229-250677925",
});

mercadopagoCtrl.createPreference = async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:4200/",
        failure: "https://www.facebook.com/",
        pending: "https://www.instagram.com/",
      },
      auto_return: "approved",
    };
    const preference = new mercadopago.Preference(client);
    const result = await preference.create({ body });

    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
};

module.exports = mercadopagoCtrl;
