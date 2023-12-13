import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-startpage',
    templateUrl: './startpage.component.html',
    styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit, AfterViewInit {
    textSlide = ['a great ', 'a beautiful ', 'a tiptop ', 'an excellent ', 'a remarkable ', 'an awesome', 'an exquisit', 'an unforgetable'];
    currentText = 0;
    weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', ' Thursday', 'Friday', 'Saturday'];
    day = new Date();
    today = '';
    number = 0;


    @ViewChild('imageCanvas', { static: false })
    canvasEl: ElementRef<HTMLCanvasElement>;

    ctx: CanvasRenderingContext2D;
    PARTICLE_DIAMETER = 1;
    particles = [];

    mouseX = Infinity;
    mouseY = Infinity;

    animationFrameId: number = 0;
    mouseLeaveTimestamp: number;
    doAnimation: Boolean = true;

    ngOnInit() {
        this.updateTextSlide();
        this.updateDay();
        window.addEventListener('scroll', this.scrollEvent, true);
        setTimeout(() => {
            this.doAnimation = false;
        }, 5000);
    }

    ngAfterViewInit() {
        this.initImage();
        this.addEventListeners();
    }

    scrollEvent = (event: any): void => {
        const scroll = event.srcElement.scrollingElement.scrollTop;
    }

    updateTextSlide() {
        setInterval(() => {
            this.currentText++
            this.currentText = this.currentText % this.textSlide.length;
        }, 3000);
    }

    updateDay() {
        this.today = this.weekday[this.day.getDay()];
    }

    initImage() {
        const canvas = this.canvasEl.nativeElement;
        this.ctx = canvas.getContext('2d');

        const img = new Image();

        if (window.innerWidth > 500) {
            img.src = 'assets/img/simon_weiss.jpg';
        } else {
            img.src = 'assets/img/simon_weiss_mobil.jpg';
        }


        img.addEventListener('load', () => {
            canvas.width = img.width;
            canvas.height = img.height;

            this.ctx.drawImage(img, 0, 0);

            const imageData = this.ctx.getImageData(0, 0, img.width, img.height).data;
            const numRows = Math.round(img.height / this.PARTICLE_DIAMETER);
            const numColumns = Math.round(img.width / this.PARTICLE_DIAMETER);


            for (let row = 0; row < numRows; row++) {
                for (let column = 0; column < numColumns; column++) {
                    const pixelIndex = (row * this.PARTICLE_DIAMETER * img.width + column * this.PARTICLE_DIAMETER) * 4;

                    const red = imageData[pixelIndex];
                    const green = imageData[pixelIndex + 1];
                    const blue = imageData[pixelIndex + 2];
                    const alpha = imageData[pixelIndex + 3];

                    this.particles.push({
                        x: Math.floor(Math.random() * numColumns * this.PARTICLE_DIAMETER),
                        y: Math.floor(Math.random() * numRows * this.PARTICLE_DIAMETER),
                        originX: column * this.PARTICLE_DIAMETER + this.PARTICLE_DIAMETER / 2,
                        originY: row * this.PARTICLE_DIAMETER + this.PARTICLE_DIAMETER / 2,
                        color: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`,
                    })
                }
            }

            this.drawParticles();
        });
    }

    drawParticles() {
        this.updateParticles();
        const canvas: HTMLCanvasElement = this.canvasEl.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particleSize = this.PARTICLE_DIAMETER;

        this.particles.forEach((particle) => {

            const x = particle.x - particleSize / 2;
            const y = particle.y - particleSize / 2;

            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(x, y, particleSize, particleSize);
        });

        if (this.doAnimation) {
            this.animationFrameId = requestAnimationFrame(() => this.drawParticles());
        }
        else {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = 0;
        }
    }



    addEventListeners() {
        const canvas: HTMLCanvasElement = this.canvasEl.nativeElement;

        canvas.addEventListener('mousemove', (event) => {
            this.mouseX = event.offsetX;
            this.mouseY = event.offsetY;
            this.doAnimation = true;

            if (this.animationFrameId < 2) {
                this.animationFrameId = requestAnimationFrame(() => this.drawParticles());
            }
        });

        canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();

            const touch = event.touches[0];
            this.mouseX = touch.clientX - canvas.offsetLeft;
            this.mouseY = touch.clientY - canvas.offsetTop;

            this.doAnimation = true;

            if (this.animationFrameId < 2) {
                this.animationFrameId = requestAnimationFrame(() => this.drawParticles());
            }
        });

        canvas.addEventListener('mouseleave', () => {

            this.mouseX = Infinity;
            this.mouseY = Infinity;

            setTimeout(() => {
                this.doAnimation = false
            }, 2000);
        });

        canvas.addEventListener('touchend', () => {
            this.mouseX = Infinity;
            this.mouseY = Infinity;

            // Set a timeout to disable the animation after 2000ms (2 seconds)
            setTimeout(() => {
                this.doAnimation = false;
            }, 2000);
        });
    }


    updateParticles() {
        let REPEL_RADIUS = 0;
        if (window.innerWidth > 500) {
            REPEL_RADIUS = 100;
        } else {
            REPEL_RADIUS = 40;
        }

        const REPEL_SPEED = 6;
        const RETURN_SPEED = 0.2;

        this.particles.forEach((particle) => {
            const distanceFromMouseX = this.mouseX - particle.x;
            const distanceFromMouseY = this.mouseY - particle.y;
            const distanceFromMouse = Math.sqrt(distanceFromMouseX ** 2 + distanceFromMouseY ** 2);

            if (distanceFromMouse < REPEL_RADIUS) {
                const angle = Math.atan2(distanceFromMouseY, distanceFromMouseX);
                const force = (REPEL_RADIUS - distanceFromMouse) / REPEL_RADIUS;
                const moveX = Math.cos(angle) * force * REPEL_SPEED;
                const moveY = Math.sin(angle) * force * REPEL_SPEED;

                particle.x -= moveX;
                particle.y -= moveY;

            } else if (particle.x !== particle.originX || particle.y !== particle.originY) {
                const distanceFromOriginX = particle.originX - particle.x;
                const distanceFromOriginY = particle.originY - particle.y;
                const distanceFromOrigin = Math.sqrt(distanceFromOriginX ** 2 + distanceFromOriginY ** 2);

                const angle = Math.atan2(distanceFromOriginY, distanceFromOriginX);
                const moveX = Math.cos(angle) * distanceFromOrigin * RETURN_SPEED;
                const moveY = Math.sin(angle) * distanceFromOrigin * RETURN_SPEED;

                particle.x += moveX;
                particle.y += moveY;
            }
        });
    }


}
