const calBookingUrl = import.meta.env.VITE_CAL_COM_URL?.trim();

export const bookingHref = calBookingUrl || "/contact";

export const bookingLinkProps = calBookingUrl
  ? {
      href: calBookingUrl,
      target: "_blank",
      rel: "noreferrer",
    }
  : {
      href: bookingHref,
    };
