export const AboutPage = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">Nuestra Empresa</h1>

      <div  className="object-cover w-full h-[500px]"style={{backgroundImage: 'url(/img/about.jpg)'}}/>

      <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-midium text-slate-800">

        <p>
          LaptopPC es una tienda en linea que se dedica a la venta de celulares, fundada en 2025. Nuestro objetivo es ofrecer a nuestros clientes la mejor calidad y precios en el mercado. Contamos con profecionales que se encargan de selecionar los mejores productos para ti.
        </p>
        <p>
          En LaptopPC podras encontrar una amplia variedad de productos tecnológicos de las mejores marcas. Además, contamos con promociones y descuentos exclusivos para que puedas comprar tu producto y ahorrar mientras los haces.
        </p>
          <h2 className="text-3xl font-semibold tracking-tighh mt-8 mb-4">
            ¡No esperes mas y compra tu producto en LaptopPC!
          </h2>
          <p>
            Para mas información, no dudes en ponerte en contacto con nosotros, atravéz de  nuestro correo electrónico:
            <a href="mailto:correo@laptoppc.com">correo@laptoppc.com</a> o llamando al <a href="tel:333333333">333333333</a>
          </p>
      </div>
    </div>
  )
}
