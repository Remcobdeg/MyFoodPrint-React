import { useEffect } from "react";
import ReactGA from "react-ga4";

export const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
}   

// track clicks on body
export const useTrackClicks = () => {
  useEffect(() => {
    const handleBodyClick = (event) => {
      const { target } = event;
      const { tagName, id, className } = target;
      const { href } = target;
      const { name } = target;
      ReactGA.event({
        category: 'User',
        action: 'Click',
        label: `Clicked on inactive ${tagName} with id: ${id} and class: ${className} and href: ${href} and name: ${name}`, 
      });
    };
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);
};


export const useTrackExit = () => {
    // GA tracking: leaving website
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        console.log('leaving website tab');
        ReactGA.event({
          category: 'User',
          action: 'Leaving Website',
          label: 'Leaving Website',
          value: 1
        });
      };
      window.addEventListener('blur', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
};

// ga4.set({userId: "12345"}) // Set the user ID using signed-in user_id.