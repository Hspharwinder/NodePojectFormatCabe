var PUSH_TYPE = {
  0: {
    keys: [
      {
        key: "companyName",
        label: "Company Name",
        index: 0,
        value: null,
        isShow: true,
        dataType: "String"
      }
    ],
    message: {
      en: "You have new ride {{userId.firstName}}",
      ar: "You have new ride {{userId.firstName}} ar"
    },
    title: {
      en: "You have new ride {{userId.firstName}}",
      ar: "You have new ride {{userId.firstName}} ar"
    }
  },
  1: {
    keys: [],
    message: {
      en: "You have new ride {{userId.firstName}}",
      ar: "You have new ride {{userId.firstName}} "
    },
    title: {
      en: "You have new ride {{userId.firstName}}",
      ar: "You have new ride {{userId.firstName}} "
    }
  },
  2: {
    keys: [],
    message: {
      en: "Your booking has been accepted by {{driverId.firstName}}",
      ar: "Your booking has been accepted by {{driverId.firstName}} "
    },
    title: {
      en: "Your booking has been accepted by {{driverId.firstName}}",
      ar: "Your booking has been accepted by {{driverId.firstName}} "
    }
  },
  3: {
    keys: [],
    message: {
      en: "Driver has arrived at pick-up location.",
      ar: "Driver has arrived at pick-up location. ar"
    },
    title: {
      en: "Driver has arrived at pick-up location.",
      ar: "Driver has arrived at pick-up location. ar"
    }
  },
  4: {
    keys: [],
    message: {
      en: "Your ride started",
      ar: "Your ride started. ar"
    },
    title: {
      en: "Your ride started",
      ar: "Your ride started. ar"
    }
  },
  5: {
    keys: [],
    message: {
      en: "Your ride is completed.",
      ar: "Your ride is completed. ar"
    },
    title: {
      en: "Your ride is completed.",
      ar: "Your ride is completed. ar"
    }
  },
  6: {
    keys: [],
    message: {
      en: "Your ride is cancelled.",
      ar: "Your ride is cancelled. ar"
    },
    title: {
      en: "Your ride is cancelled.",
      ar: "Your ride is cancelled. ar"
    }
  },
  7: {
    keys: [],
    message: {
      en: "No driver available nearby, please try again later.",
      ar: "No driver available nearby, please try again later. ar"
    },
    title: {
      en: "No driver available nearby, please try again later.",
      ar: "No driver available nearby, please try again later. ar"
    }
  },
  8: {
    keys: [],
    message: {
      en: "Oops!.. No driver available nearby, please try again later.",
      ar: "Oops!.. No driver available nearby, please try again later. ar"
    },
    title: {
      en: "Oops!.. No driver available nearby, please try again later.",
      ar: "Oops!.. No driver available nearby, please try again later. ar"
    }
  },
  9: {
    keys: [],
    message: {
      en: "Scheduling your ride.",
      ar: "Scheduling your ride. ar"
    },
    title: {
      en: "Scheduling your ride.",
      ar: "Scheduling your ride. ar"
    }
  },
  10: {
    keys: [],
    message: {
      en: "You have new delivery {{userId.firstName}}",
      ar: "You have new delivery {{userId.firstName}} ar"
    },
    title: {
      en: "You have new delivery {{userId.firstName}}",
      ar: "You have new delivery {{userId.firstName}} ar"
    }
  },
  11: {
    keys: [],
    message: {
      en: "Driver has arrived at pick-up location.",
      ar: "Driver has arrived at pick-up location. ar"
    },
    title: {
      en: "Driver has arrived at pick-up location.",
      ar: "Driver has arrived at pick-up location. ar"
    }
  },
  12: {
    keys: [],
    message: {
      en: "Driver is arriving.",
      ar: "Driver is arriving. ar"
    },
    title: {
      en: "Driver is arriving.",
      ar: "Driver is arriving. ar"
    }
  },
  13: {
    keys: [],
    message: {
      en: "Your delivery is completed.",
      ar: "Your delivery is completed. ar"
    },
    title: {
      en: "Your delivery is completed.",
      ar: "Your delivery is completed. ar"
    }
  },
  14: {
    keys: [],
    message: {
      en: "Driver is out for delivery.",
      ar: "Driver is out for delivery. ar"
    },
    title: {
      en: "Driver is out for delivery.",
      ar: "Driver is out for delivery. ar"
    }
  },
  15: {
    keys: [],
    message: {
      en: "Your delivery is cancelled.",
      ar: "Your delivery is cancelled. ar"
    },
    title: {
      en: "Your delivery is cancelled.",
      ar: "Your delivery is cancelled. ar"
    }
  },
  16: {
    keys: [],
    message: {
      en: "Your delivery booking has been accepted by {{driverId.firstName}}",
      ar: "Your delivery booking has been accepted by {{driverId.firstName}} "
    },
    title: {
      en: "Your delivery booking has been accepted by {{driverId.firstName}}",
      ar: "Your delivery booking has been accepted by {{driverId.firstName}} "
    }
  },
  17: {
    keys: [],
    message: {
      en: "Scheduling your delivery.",
      ar: "Scheduling your delivery. ar"
    },
    title: {
      en: "Scheduling your delivery.",
      ar: "Scheduling your delivery. ar"
    }
  },
  18: {
    keys: [],
    message: {
      en: "Your packages have been picked up.",
      ar: "Your packages have been picked up. ar"
    },
    title: {
      en: "Your packages have been picked up.",
      ar: "Your packages have been picked up. ar"
    }
  },
};
module.exports = {
  PUSH_TYPE: PUSH_TYPE,
  LANGUAGE_TYPE: {
    DEFAULT: "en",
    ENGLISH: "en",
    ARABIC: "ar"
  },
  BOOKING_STATUS_FILTER: {
    COMPLETED:1,
    CANCELED:2,
    UPCOMMING: 3
  },
  ROLE: {
    DELIVERY_PARTNER: "DELIVERY_PARTNER",
    BUSINESS_PARTNER: "BUSINESS_PARTNER",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN"
  },
  paymentMode: {
    CASH: "CASH",
    CARD: "CARD",
    WALLET: "WALLET"
  },
  VERIFICATION_SERVICE: {
    EMAIL: "EMAIL",
    SMS: "SMS"
  },
  EVENT_TYPE: {
    DEFAULT: "DEFAULT",
    NO_DRIVER_AVAILABLE_CANCEL_BOOKING: "NO_DRIVER_AVAILABLE_CANCEL_BOOKING",
    // BOOKING_ACCEPTED: "BOOKING_ACCEPTED",
  },
  SOCKET_TYPE: {
    BROAD_CAST: "BROAD_CAST",
    USER: "USER",
    ADMIN: "ADMIN"
  },
  PAYMENT_MODE: {
    CASH: "CASH",
    CARD: "CARD",
    WALLET: "WALLET"
  },
  PAYMENT_STATUS: {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED"
  },
  BOOKING_STATUS: {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    COMPLETED: "COMPLETED",
    ARRIVED: "ARRIVED",
    STARTED: "STARTED",
    ONGOING: "ONGOING",
    CANCELED: "CANCELED"
  },
  BOOKING_TYPE: {
    RIDE: "RIDE",
    DELIVERY: "DELIVERY"
  },
  BOOKING_MESSAGES: {
    NO_DRIVER_AVAILABLE_TRIP_CANCELLED: "NO_DRIVER_AVAILABLE_TRIP_CANCELLED",
    BOOKING_ACCEPTED: "BOOKING_ACCEPTED"
  },
  FILE_PATH: {
    ADMIN: "/static/admin",
    USER: "/static/user",
    DRIVER: "/static/driver",
    DOCUMENT: "/static/document"
  },
  SMS_EVENT_TYPE: {
    SEND_OTP: "SEND_OTP"
  },
  DEFAULT_LIMIT: 10,
  DEFAULT_SKIP: 0
};
