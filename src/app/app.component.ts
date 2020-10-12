import {
  Component,
  HostListener,
  ViewChild
} from '@angular/core';
import {
  Programa
} from './model/programa.model';
import {
  RestApiService
} from './service/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestApiService]
})

export class AppComponent {
  title = 'EvalFrontEnd';
  panelOpenState = false;
  public programa: Programa = new Programa();
  constructor(public restApi: RestApiService) {

  }

  ngOnInit(): void {
    this.restApi.getJSON().subscribe((data: Programa) => {
      this.programa = data;
    });
  }

  ngAfterViewInit(): void {
    let oBody: HTMLElement = document.querySelector('body');
    this.onScreenResize();
    oBody.addEventListener("resize", () => {
      this.onScreenResize();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //event.target.innerWidth;
    this.onScreenResize();
  }

  onScreenResize() {
    let oBody: any = document.body;
    let oHtml: any = document.documentElement;

    let height = Math.max(oBody.scrollHeight, oBody.offsetHeight,
      oHtml.clientHeight, oHtml.scrollHeight, oHtml.offsetHeight);

    let imgCurso: HTMLElement = document.getElementById("imgCurso");
    if (imgCurso) {
      imgCurso.style.minHeight = (height - 150) + "px";
    }
  }

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
