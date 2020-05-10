const firstVisitDisplayText = "Message for recruiters and hiring managers.";

const firstVisitText =
  "Thanks for visiting my website! This is a little something I put together to demonstrate " +
  "the technologies I develop with. If you're a recruiter or hiring manager, I'm in the job market after being " +
  "recently laid off due to COVID-19. I'm coming on two years of experience developing across the full stack, including " +
  "UI work, REST API's, public facing websites, CRMs, third party integrations, and general web dev stuff. React + .NET/C# " +
  "(Framework & Core) are my bread and butter, but you can take a look at my other skill areas on my resume (see Contact page). " +
  "Take a look at the About page for an overview of the tech that I'm using for this site. Also see the contact page if you'd like " +
  "to get in touch with me. If you just happened across this page for no reason, or are another developer who is curious about the " +
  "development of this site, you can also feel free to reach out to me or to leave a message on the guestbook.";

const firstVisitSubtext = "-Ben";

export const firstVisitMessageObject = {
  displayText: firstVisitDisplayText,
  mainText: firstVisitText,
  subText: firstVisitSubtext,
};

export function getCollapsedHeight() {
  return document.getElementById("notification-container")!.clientHeight;
}

function calculateScale() {
  const fullHeight = document.getElementById("main-text-container")!
    .clientHeight;
  const collapsedHeight = getCollapsedHeight();

  return fullHeight / collapsedHeight;
}

function createKeyFrameAnimation() {
  const mainScale = calculateScale();
  const collapsedHeight = getCollapsedHeight();
  let animation = "";
  let reverseAnimation = "";
  let inverseAnimation = "";
  let inverseReverseAnimation = "";
  let closeFromOpenAnimation = "";
  let closeFromClosedAnimation = "";
  let openPageTopAnimation = "";
  let closePageTopAnimation = "";

  for (let step = 0; step <= 100; step++) {
    const factor = step / 100;
    const scaleY = 1 + (mainScale - 1) * factor;
    const reverseScaleY = mainScale - (mainScale - 1) * factor;
    const invScaleY = 1 / scaleY;
    const invReverseScaleY = 1 / reverseScaleY;
    const closeScaleOpen = mainScale - mainScale * factor;
    const closeScaleClosed = 1 - factor;
    const pageTop = mainScale * collapsedHeight - collapsedHeight;
    const pageTopExpand = pageTop * factor;
    const pageTopClose = pageTop - pageTopExpand;

    animation += `
      ${step}% {
          transform: scaleY(${scaleY});
      }`;

    reverseAnimation += `
      ${step}% {
          transform: scaleY(${reverseScaleY});
      }`;

    inverseAnimation += `
      ${step}% {
          transform: scaleY(${invScaleY});
      }`;

    inverseReverseAnimation += `
      ${step}% {
          transform: scaleY(${invReverseScaleY});
      }`;

    closeFromOpenAnimation += `
        ${step}% {
            transform: scaleY(${closeScaleOpen});
        }`;

    closeFromClosedAnimation += `
          ${step}% {
              transform: scaleY(${closeScaleClosed});
          }`;

    openPageTopAnimation += `
          ${step}% {
              top: ${pageTopExpand}px
          }
          `;

    closePageTopAnimation += `
          ${step}% {
              top: ${pageTopClose}px
          }
          `;
  }

  const animationStyleString = `
    @keyframes notificationAnimation {
        ${animation}
    }
    
    @keyframes notificationReverseAnimation {
        ${reverseAnimation}
    }
    
    @keyframes notificationContentsAnimation {
        ${inverseAnimation}
    }
    
    @keyframes notificationReverseContentsAnimation {
        ${inverseReverseAnimation}
    }
    
    @keyframes notificationCloseFromOpen {
        ${closeFromOpenAnimation}
    }
    
    @keyframes notificationCloseFromClosed {
        ${closeFromClosedAnimation}
    }
    
    @keyframes openPageTop {
        ${openPageTopAnimation}
    }
    
    @keyframes closePageTop {
        ${closePageTopAnimation}
    }`;

  return animationStyleString;
}

export function addAnimations() {
  const styleSheet = document.getElementById("animation-stylesheet");

  if (styleSheet == null) {
    const style = document.createElement("style");
    style.id = "animation-stylesheet";
    style.textContent = createKeyFrameAnimation();
    document.head.append(style);
  } else {
    styleSheet.textContent = createKeyFrameAnimation();
  }
}

export function resetPageTop(isExpanded, isClosed) {
  if (isExpanded !== null) {
    const el = document.getElementsByClassName("page-container")[0];
    const cssString = `
              animation-name: ${
                isExpanded && !isClosed ? "openPageTop" : "closePageTop"
              };
              animation-duration: 0.25s;
              animation-timing-function: 0.25s;
              animation-fill-mode: forwards;
          `;

    (el as HTMLElement).style.cssText = cssString;
  }
}

export function resizeDisplayText() {
  const mainContainer = document.getElementById("notification-container")!;
  const controlContainer = document.getElementById(
    "notification-controls-container"
  )!;
  const container = document.getElementById("collapsed-text-container")!;
  const width =
    mainContainer.clientWidth -
    controlContainer.clientWidth -
    container.children[0].clientWidth;
  (container.children[1] as HTMLElement).style.width = `${width}px`;
}

export function fadeInText() {
  const text = document.getElementById("notification-text-container")!;
  text.classList.remove("animate-text");
  void text.offsetWidth;
  text.classList.add("animate-text");
}
