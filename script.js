var timeOut;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnimation() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
  });
  tl.to(".boundingElem", {
    y: "0",
    ease: Expo.easeInOut,
    duration: 2,
    delay: -1,
    stagger: 0.2,
  });
  tl.from("#heroFooter", {
    y: "+10",
    ease: Expo.easeInOut,
    delay: -1,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
  });
}

function circleSqueeze() {
  //Define Default scale value
  var xScale = 1;
  var yScale = 1;
  var xPrev = 0;
  var yPrev = 0;
  window.addEventListener("mousemove", function (dets) {
    //Clear the timeout
    clearTimeout(timeOut);
    //We'll use clamp to limit the scale value between .8 and 1.2
    xScale = gsap.utils.clamp(0.7, 1.2, dets.clientX - xPrev);
    yScale = gsap.utils.clamp(0.7, 1.2, dets.clientY - yPrev);

    xPrev = dets.clientX;
    yPrev = dets.clientY;

    circleMouseFollower(xScale, yScale);
    timeOut = setTimeout(() => {
      document.querySelector(
        "#miniCircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circleMouseFollower(xScale, yScale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#miniCircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`;
  });
}

circleSqueeze();
circleMouseFollower();
firstPageAnimation();
