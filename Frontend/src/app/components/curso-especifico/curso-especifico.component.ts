import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso.service';
import { MercadopagoService } from '../../services/mercadopago.service';

declare var MercadoPago: any;

@Component({
  selector: 'app-curso-especifico',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './curso-especifico.component.html',
  styleUrls: ['./curso-especifico.component.css']
})
export class CursoEspecificoComponent implements OnInit {
  curso: Curso | undefined;
  mensaje: string = '';

  constructor(
    private cursoService: CursoService,
    private mercadoPagoService: MercadopagoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoService.getCursoById(id).subscribe(
        (data: Curso) => {
          this.curso = data;
        },
        (error) => {
          this.mensaje = 'Error al obtener el curso';
          console.error('Error al obtener el curso:', error);
        }
      );
    }

    // Cargar el SDK de MercadoPago
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = 'text/javascript';
    script.onload = () => {
      this.initializeMercadoPago();
    };
    document.body.appendChild(script);
  }

  initializeMercadoPago(): void {
    const mp = new MercadoPago('TEST-6242e4ff-ffc4-4b3d-80b2-5d6efe2b1021', {
      locale: 'es-AR'
    });

    document.getElementById('checkout-btn')?.addEventListener('click', async () => {
      if (this.curso) {
        try {
          const orderData = {
            title: this.curso.titulo,
            quantity: 1,
            price: this.curso.precio
          };

          const response = await this.mercadoPagoService.createPreference(orderData).toPromise();
          this.createCheckoutButton(mp, response.id);
        } catch (error) {
          console.error('Error creating preference:', error);
          alert('Error al crear la preferencia de pago');
        }
      }
    });
  }

  createCheckoutButton(mp: any, preferenceId: string): void {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
      if ((window as any).checkoutButton) (window as any).checkoutButton.unmount();

      await bricksBuilder.create('wallet', 'wallet_container', {
        initialization: {
          preferenceId: preferenceId
        }
      });
    };

    renderComponent();
  }
}
