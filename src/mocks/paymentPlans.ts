const paymentPlans = [
    {
      name: "Gratis",
      plan: "20 Peticiones",
      description: "Para aplicaciones de prueba.",
      price: 0,
      button: { value: "Ingresar", action: () => alert("Ingresar Free") },
    },
    {
      name: "Premium",
      plan: "1K Peticiones",
      description:
        "Para aplicaciones de producción de pequeñas y medianas empresas.",
      price: 9.99,
      button: {
        value: "Solicitar",
        action: () => alert("Solicitar Premium"),
      },
    },
    {
      name: "Top",
      plan: "10K Peticiones",
      description: "Perfecto para empresas con altos volumenes de datos.",
      price: 96.99,
      button: { value: "Solicitar", action: () => alert("Solicitar Top") },
    },
  ]

  export default paymentPlans