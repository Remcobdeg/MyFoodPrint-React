import ReactGA from "react-ga4";

const trackPage = (page) => {
  ReactGA.pageview(page);
}

const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });
}   

// ga4.set({userId: "12345"}) // Set the user ID using signed-in user_id.