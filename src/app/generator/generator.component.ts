import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit{

  ngOnInit(): void {
      
  }

  @ViewChild('memeCanva' , {static:false}) myCanvas : any;
  topText : string = '';
  bottomText : string = '';
  fileEvent : any ;
  textColor : any = '#000000' ;
  bgColor : any = '#FFFFFF';

  onChange(event: any) {
    this.fileEvent = event;
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let renderer = new FileReader();
    renderer.readAsDataURL(event.target.files[0]);
    renderer.onload = function (event) {
    const image = new Image();
    image.src = event.target?.result as string;
    image.onload = function() {
      ctx.drawImage(image , 55 , 70 , 500 , 430 );
    }
   }
  }

  onText(){
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    ctx.clearRect( 0  , 0, canvas.width , canvas.height);
    ctx.fillStyle =this.bgColor;
    ctx.fillRect( 0  , 0, canvas.width , canvas.height);
    this.onChange(this.fileEvent);


    ctx.fillStyle = this.textColor;
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(this.topText , canvas.width/2 , 50);
    ctx.fillText(this.bottomText, canvas.width/2 , 560);
  }

  changeTextColor(event : ColorEvent ){
    this.textColor = event.color.hex;
    console.log(this.textColor);
    this.onText();
   }

   changeBgColor(event : ColorEvent){
    this.bgColor =event.color.hex;
    this.onText();
   }

   download() {
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.download = 'memeImg';
    link.href = image;
    link.click();
   }

}
