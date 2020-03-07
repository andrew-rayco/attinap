import React, { Component } from 'react'
import Snap from 'snapsvg'
import ReactDOM from 'react-dom'

class SunMoon extends Component {
    // Pinched from https://codepen.io/Menganito/full/rVqrOR
    constructor() {
        super()

        // this.sun = React.createRef()

        this.animationIn = this.animationIn.bind(this)
        this.stars = this.stars.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.animationIn()
        }, 3000)
    }

    morph(path, scale) {
        let s = Snap.select('#sun')
        s.animate({ d: path, transform: scale }, 500, mina.backin)
    }

    stars(t, o, d) {
        let { star1, star2, star3, starGroup } = this.refs
        // let ss = Snap.select('#starGroup')
        console.log(starGroup, t, o)

        starGroup.animate({ transform: t }, 500, mina.easeinout)
        star1.animate({ opacity: o }, Number(d[0]), mina.backin)
        star3.animate({ opacity: o }, Number(d[1]), mina.backin)
        star2.animate({ opacity: o }, Number(d[2]), mina.backin)
    }

    /******* Initial animation (Moon) ********/
    animationIn() {
        // undefined
        // let star1 = Snap.select('#star1')
        // let star2 = Snap.select('#star2')
        // let star3 = Snap.select('#star3')
        let sunRay1 = Snap.select('#sunRay2')
        let sunRay2 = Snap.select('#sunRay4')
        let sunRay3 = Snap.select('#sunRay8')
        let sunRay4 = Snap.select('#sunRay6')
        let sunRay5 = Snap.select('#sunRay1')
        let sunRay6 = Snap.select('#sunRay3')
        let sunRay7 = Snap.select('#sunRay7')
        let sunRay8 = Snap.select('#sunRay5')
        // SVG path animation
        let { sun, star1, star2, star3 } = this.refs

        sun.style.fill = '#2B77A0'
        console.log(star1)
        star1.style.fill = '#FFC928'
        star2.style.fill = '#FFCF42'
        star3.style.fill = '#FFCC35'
        console.log(star1)
        // document.getElementById('#star1').css({ fill: '#FFC928' })
        // document.getElementById('#star2').css({ fill: '#FFCF42' })
        // document.getElementById('#star3').css({ fill: '#FFCC35' })

        let pathIn =
            'M33.5,48.8c-1.3,0.4-4.9,1.3-9.6,0.8c-1-0.1-2.9-0.2-5.1-1c-2.9-1.1-5.2-1.9-7.8-3.8c-5.5-3.9-7.9-9.3-8.8-11.3c-0.8-1.9-3.2-8.4-1-16.1c1.4-4.8,3.9-7.8,5.8-10C9.5,4.7,17.4-2.1,17,0.2c-0.8,4.3-2.3,6.8-1.2,14.6c1.1,8,7.3,16.7,15.3,18.8c9.6,2.5,11.2,1.5,18.7,0.3c1.9-0.3-4,7.6-6.8,9.9C41.5,45,38.3,47.4,33.5,48.8z'

        this.morph(pathIn, 't0, 0, 1')

        // Stars animation
        let duration = []
        duration = ['150', '300', '450']
        setTimeout(() => {
            this.stars('t5, -10, s2.5', 1, duration)
        }, 300)

        // Sunrays animation
        sunRay1.animate({ opacity: 0 }, 55, mina.easing)
        sunRay2.animate({ opacity: 0 }, 110, mina.easing)
        sunRay3.animate({ opacity: 0 }, 220, mina.easing)
        sunRay4.animate({ opacity: 0 }, 275, mina.easing)
        sunRay5.animate({ opacity: 0 }, 330, mina.easing)
        sunRay6.animate({ opacity: 0 }, 385, mina.easing)
        sunRay7.animate({ opacity: 0 }, 440, mina.easing)
        sunRay8.animate({ opacity: 0 }, 495, mina.easing)
    }
    /*****************************************/

    /********* Back animation (Sun) *********/
    animationBack() {
        let star1 = Snap.select('#star1')
        let star2 = Snap.select('#star2')
        let star3 = Snap.select('#star3')
        let sunRay1 = Snap.select('#sunRay2')
        let sunRay2 = Snap.select('#sunRay4')
        let sunRay3 = Snap.select('#sunRay8')
        let sunRay4 = Snap.select('#sunRay6')
        let sunRay5 = Snap.select('#sunRay1')
        let sunRay6 = Snap.select('#sunRay3')
        let sunRay7 = Snap.select('#sunRay7')
        let sunRay8 = Snap.select('#sunRay5')
        let pathEnd =
            'M24.7,38.9c-0.6,0-2.9-0.1-5.5-1.4C18.4,37.1,16,36,14,33.4c-0.9-1.1-3.2-4.1-3.3-8.6c0-0.5,0-2.9,1.2-5.7c0.5-1.2,1.8-3.6,4.4-5.6c1.2-0.9,4.3-3,8.7-2.9c3.6,0,6.2,1.5,7.1,2.1c2.5,1.5,4,3.4,4.5,4.1c0.6,0.9,2.6,3.8,2.6,8c0,5-2.7,8.4-3.5,9.2C35.3,34.5,31.1,39.2,24.7,38.9z'

        // SVG path animation
        // $('#sun').css({ fill: '#FFEC50' })
        this.morph(pathEnd, 't0, 0, s1')

        // Stars animation
        duration = ['300', '150', '450']
        this.stars('t5, 0, s1', 0, duration)

        // Sunrays animation
        setTimeout(function() {
            this.sunRay1.animate({ opacity: 1 }, 55, mina.easing)
            this.sunRay2.animate({ opacity: 1 }, 110, mina.easing)
            this.sunRay3.animate({ opacity: 1 }, 220, mina.easing)
            this.sunRay4.animate({ opacity: 1 }, 275, mina.easing)
            this.sunRay5.animate({ opacity: 1 }, 330, mina.easing)
            this.sunRay6.animate({ opacity: 1 }, 385, mina.easing)
            this.sunRay7.animate({ opacity: 1 }, 440, mina.easing)
            this.sunRay8.animate({ opacity: 1 }, 495, mina.easing)
        }, 300)
    }
    /*****************************************/

    // This was commented out in the source codepen (see top of file)
    //$('#container').hover(function(){
    //animationIn();
    //$('body').addClass('bg-night');
    //}, function(){
    //animationBack();
    //$('body').removeClass('bg-night');
    //});

    animController() {
        setInterval(() => {
            setTimeout(() => {
                this.animationIn()

                setTimeout(() => {
                    this.animationBack()
                }, 2000)
            }, 2000)
        }, 3500)
    }

    render() {
        return (
            <div className="svg-wrapper">
                <div className="sunmoon-container">
                    <svg viewBox="0 0 50 50">
                        <path
                            ref={'sun'}
                            id="sun"
                            d="M24.7,38.9c-0.6,0-2.9-0.1-5.5-1.4C18.4,37.1,16,36,14,33.4c-0.9-1.1-3.2-4.1-3.3-8.6
            c0-0.5,0-2.9,1.2-5.7c0.5-1.2,1.8-3.6,4.4-5.6c1.2-0.9,4.3-3,8.7-2.9c3.6,0,6.2,1.5,7.1,2.1c2.5,1.5,4,3.4,4.5,4.1
            c0.6,0.9,2.6,3.8,2.6,8c0,5-2.7,8.4-3.5,9.2C35.3,34.5,31.1,39.2,24.7,38.9z"
                        />
                        <g className="sunRays">
                            <path
                                id="sunRay1"
                                d="M25.4,47.5c-0.7,0-1.3-0.6-1.3-1.3v-4c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3v4
        C26.8,46.9,26.2,47.5,25.4,47.5z"
                            />
                            <path
                                id="sunRay2"
                                d="M25.4,9.2c-0.7,0-1.3-0.6-1.3-1.3v-4c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3v4
        C26.8,8.6,26.2,9.2,25.4,9.2z"
                            />
                            <path
                                id="sunRay3"
                                d="M9.9,41.2c-0.3,0-0.7-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9l2.8-2.8c0.5-0.5,1.4-0.5,1.9,0
        c0.5,0.5,0.5,1.4,0,1.9l-2.8,2.8C10.6,41,10.2,41.2,9.9,41.2z"
                            />
                            <path
                                id="sunRay4"
                                d="M37,14.1c-0.3,0-0.7-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9L38.9,9c0.5-0.5,1.4-0.5,1.9,0
        c0.5,0.5,0.5,1.4,0,1.9l-2.8,2.8C37.7,14,37.3,14.1,37,14.1z"
                            />
                            <path
                                id="sunRay5"
                                d="M12.7,14.1c-0.3,0-0.7-0.1-0.9-0.4l-2.8-2.8c-0.5-0.5-0.5-1.4,0-1.9s1.4-0.5,1.9,0l2.8,2.8
        c0.5,0.5,0.5,1.4,0,1.9C13.4,14,13.1,14.1,12.7,14.1z"
                            />
                            <path
                                id="sunRay6"
                                d="M39.8,41.2c-0.3,0-0.7-0.1-0.9-0.4L36,37.9c-0.5-0.5-0.5-1.4,0-1.9s1.4-0.5,1.9,0l2.8,2.9
        c0.5,0.5,0.5,1.4,0,1.9C40.5,41,40.2,41.2,39.8,41.2z"
                            />
                            <path
                                id="sunRay7"
                                d="M7.4,26.7h-4c-0.7,0-1.3-0.6-1.3-1.3S2.6,24,3.4,24h4c0.7,0,1.3,0.6,1.3,1.3S8.1,26.7,7.4,26.7z"
                            />
                            <path
                                id="sunRay8"
                                d="M45.7,26.7h-4c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3h4c0.7,0,1.3,0.6,1.3,1.3S46.4,26.7,45.7,26.7z"
                            />
                        </g>
                        <g
                            ref={'starGroup'}
                            id="starGroup"
                            transform="translate(5 0)"
                        >
                            <polygon
                                ref={'star1'}
                                id="star1"
                                points="29.4,25.5 30,27 30.5,25.4 32.4,25.4 30.8,24.5 31.4,22.9 29.9,23.9 28.4,23 29,24.5 
    27.5,25.5 "
                            />
                            <polygon
                                ref={'star2'}
                                id="star2"
                                points="30.2,29.9 28.9,27.9 28.6,30.2 25.9,30.7 28.4,31.6 28.1,33.9 29.9,32.2 32.4,33.2 
    31,31.2 32.9,29.4 "
                            />
                            <polygon
                                ref={'star3'}
                                id="star3"
                                points="23.5,29.3 24.6,28.5 25.8,29.3 25.4,28.1 26.5,27.3 25.1,27.3 24.6,26.2 24.2,27.3 
    22.8,27.3 23.9,28.1 "
                            />
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

export default SunMoon
