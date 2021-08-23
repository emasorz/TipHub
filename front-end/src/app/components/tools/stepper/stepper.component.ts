import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements  AfterViewInit {

  @Input() currentStep: number;
  @Input() numberOfSteps: number;
  @Input() icons:string[];
  @Input() currentActive = 1;
  progress;
  circles;

 

  constructor() 
  {
    
   }


  update = () => {
    this.circles.forEach((circle, index) => {
      if (index < this.currentActive) circle.classList.add("step-active");
      else circle.classList.remove("step-active");
    });
    const actives = document.querySelectorAll(".step-active");
    this.progress.style.width = ((actives.length - 1) / (this.circles.length - 1)) * 100 + "%";
    // if (this.currentActive === 1) this.prev.disabled = true;
    // else if (this.currentActive === this.circles.length) this.next.disabled = true;
    // else {
    //   this.prev.disabled = false;
    //   this.next.disabled = false;
    // }
  };

  ngAfterViewInit(): void {
    this.progress = document.getElementById("progress");
    this.circles = document.querySelectorAll(".circle");
 
    this.update();
  }

  next(){
    this.currentActive++;
      if (this.currentActive > this.circles.length) this.currentActive = this.circles.length;
      this.update();
  }

  prev(){
    this.currentActive--;
    if (this.currentActive < 1) this.currentActive = 1;
    this.update();
  }

  counter(dim) {
    return [...Array(dim)];
  }
}
