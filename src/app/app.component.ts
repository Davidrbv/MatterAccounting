import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'MatterAccounting';

  mostrar: boolean = false;


  ngOnInit(): void {
    this.mostrar = true;
  }

  quitaInicio(){
    this.mostrar = false;
  }
}
