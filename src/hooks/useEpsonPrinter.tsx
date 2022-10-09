import { useEffect, useRef } from "react";
import store from "@stores/store";
import {
  changeAvailable,
  displayOnMenu,
  printerAvailableState,
  printerPrintingState,
  printing,
  resetState,
} from "@stores/printerSlice";
import { createNotification } from "@stores/notificationSlice";
import { useSelector } from "react-redux";

type CreateArrayWithLengthX<
  Length extends number,
  Acc extends unknown[] = []
> = Acc["length"] extends Length
  ? Acc
  : CreateArrayWithLengthX<Length, [...Acc, 1]>;

type NumericRange<
  StartArr extends number[],
  End extends number,
  Acc extends number = never
> = StartArr["length"] extends End
  ? Acc | End
  : NumericRange<[...StartArr, 1], End, Acc | StartArr["length"]>;

type DeviceType =
  | "type_display"
  | "type_printer"
  | "type_scanner"
  | "type_storage";

type Align = "center" | "left" | "right";
type Cut = "no_feed" | "feed";
type BarcodeType =
  | "upc_a"
  | "upc_e"
  | "ean13"
  | "jan13"
  | "ean8"
  | "jan8"
  | "code39"
  | "itf"
  | "codabar"
  | "code93"
  | "code128"
  | "gs1_128"
  | "gs1_databar_omnidirectional"
  | "gs1_databar_truncated"
  | "gs1_databar_limited"
  | "gs1_databar_expanded";

type BarcodeHRI = "none" | "above" | "below" | "both";
type Font = "font_a" | "font_b" | "font_c";
type LineStyle = "thin" | "medium" | "thick";

type PageDirection =
  | "left_to_right"
  | "bottom_to_top"
  | "right_to_left"
  | "top_to_bottom";

type Drawer = "drawer_1" | "drawer_2";
type PulseTime =
  | "pulse_100"
  | "pulse_200"
  | "pulse_300"
  | "pulse_400"
  | "pulse_500";

type SoundPatter =
  | "none"
  | "pattern_a"
  | "pattern_b"
  | "pattern_c"
  | "pattern_d"
  | "pattern_e"
  | "error"
  | "paper_end";

type OnReceiveResponse = {
  success: boolean;
  code:
    | "EPTR_COVER_OPEN"
    | "EPTR_AUTOMATICAL"
    | "EPTR_CUTTER"
    | "EPTR_REC_EMPTY"
    | "EPTR_UNRECOVERABLE"
    | "SchemaError"
    | "DeviceNotFound"
    | "PrintSystemError"
    | "EX_BADPORT"
    | "EX_TIMEOUT"
    | "EPTR_MECHANICAL";
  status: number;
  printjobid: string;
};

type CallbackCreateDeviceCode =
  | "OK"
  | "DEVICE_NOT_FOUND"
  | "DEVICE_IN_USE"
  | "DEVICE_OPEN_ERROR"
  | "DEVICE_TYPE_INVALID"
  | "PARAM_ERROR"
  | "SYSTEM_ERROR";

type ConnectCallbackCode =
  | "OK"
  | "SSL_CONNECT_OK"
  | "ERROR_TIMEOUT"
  | "ERROR_PARAMETER";

type DeleteDeviceCallbackCode =
  | "OK"
  | "DEVICE_NOT_OPEN"
  | "DEVICE_CLOSE_ERROR"
  | "SYSTEM_ERROR";

const PRINTER_STATUS = {
  DISCONNECTED: "Impresora Desconectada",
  CONNECTED: "Impresora Conectada",
  CONNECTION_FAILS: "Falló la conexión",
  RECONNECTING: "Reconectando a la impresora",
  RECONNECT: "Conexion a la impresora recuperada",
};

interface EPOSDevice {
  connect: (
    printerIPAddress: string,
    printerPort: 8008 | 8043,
    callback: (resultConnect: ConnectCallbackCode) => void,
    options?: { eposprint: boolean }
  ) => void;
  disconnect: () => void;
  createDevice: (
    deviceId: string,
    deviceType: DeviceType,
    options: { crypto: boolean; buffer: boolean },
    callback: (
      printerDevice: Printer,
      resultCode: CallbackCreateDeviceCode
    ) => void
  ) => void;
  deleteDevice: (
    deviceObject: Printer,
    callback: (
      result: "OK" | "DEVICE_NOT_OPEN" | "DEVICE_CLOSE_ERROR" | "SYSTEM_ERROR"
    ) => void
  ) => void;
  DEVICE_TYPE_PRINTER: DeviceType;
  eposprint: boolean;
  callEvent: (eventName: string, data: unknown) => void;
  ondisconnect: () => void;
}

const printerStatusCode = {
  ASB_NO_RESPONSE: 1,
  ASB_PRINT_SUCCESS: 2,
  ASB_DRAWER_KICK: 4,
  ASB_OFF_LINE: 8,
  ASB_COVER_OPEN: 32,
  ASB_PAPER_FEED: 64,
  ASB_WAIT_ON_LINE: 256,
  ASB_PANEL_SWITCH: 512,
  ASB_MECHANICAL_ERR: 1024,
  ASB_AUTOCUTTER_ERR: 2048,
  ASB_UNRECOVER_ERR: 8192,
  ASB_AUTORECOVER_ERR: 16384,
  ASB_RECEIPT_NEAR_END: 131072,
  ASB_RECEIPT_END: 524288,
  ASB_BUZZER: 16777216,
  ASB_WAIT_REMOVE_LABEL: 16777216,
  ASB_NO_LABEL: 67108864,
  ASB_SPOOLER_IS_STOPPED: 2147483648,
  DRAWER_OPEN_LEVEL_LOW: 0,
  DRAWER_OPEN_LEVEL_HIGH: 1,
};

type PrinterStatusCode = typeof printerStatusCode;

export interface Printer extends PrinterStatusCode {
  deviceID: string;
  isCrypto: boolean;
  interval: number;
  status: number;
  enabled: boolean;
  address: string;
  timeout: number;
  // Text
  addTextAlign: (align: Align) => void;
  addTextLineSpace: (
    lineSpc: NumericRange<CreateArrayWithLengthX<0>, 255>
  ) => void;
  addTextRotate: (rotate: boolean) => void;
  addText: (text: string) => void;
  addTextLang: (lang: "es" | "en") => void;
  addTextFont: (font: Font) => void;
  addTextSmooth: (smooth: boolean) => void;
  addTextDouble: (dw: boolean | undefined, dh: boolean | undefined) => void;
  addTextSize: (
    width: NumericRange<CreateArrayWithLengthX<1>, 8>,
    height: NumericRange<CreateArrayWithLengthX<1>, 8>
  ) => void;
  addTextStyle: (
    reverse: boolean | undefined,
    ul: boolean | undefined,
    em: boolean | undefined,
    color: "color_1"
  ) => void;
  addTextPosition: (x: number) => void;
  addTextVPosition: (y: number) => void;
  // Paper feed
  addFeedUnit: (unit: NumericRange<CreateArrayWithLengthX<0>, 255>) => void;
  addFeedLine: (line: NumericRange<CreateArrayWithLengthX<0>, 255>) => void;
  addFeed: () => void;
  // Barcode
  addBarcode: (
    data: string,
    type: BarcodeType,
    hri: BarcodeHRI,
    font: Font,
    width: NumericRange<CreateArrayWithLengthX<2>, 6>,
    height: NumericRange<CreateArrayWithLengthX<1>, 255>
  ) => void;
  // Page mode
  addPageBegin: () => void;
  addPageEnd: () => void;
  addPageArea: (x: number, y: number, width: number, height: number) => void;
  addPageDirection: (direction: PageDirection) => void;
  addPagePosition: (x: number, y: number) => void;
  addPageLine: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    style: LineStyle
  ) => void;
  addPageRectangle: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    style: LineStyle
  ) => void;
  // Cut
  addCut: (type: Cut) => void;
  // Drawer
  addPulse: (drawer: Drawer, time: PulseTime) => void;
  // Buzzer
  addSound: (
    pattern: SoundPatter,
    repeat: NumericRange<CreateArrayWithLengthX<1>, 255>
  ) => void;
  // addSymbol(data, type, level, width, height, size);
  // addLogo(key1, key2);
  // addImage(context, x, y, width, height, color, mode);
  // Recovery
  recover: () => void;
  addRecovery: () => void;
  // Reset
  reset: () => void;
  addReset: () => void;
  // Transmission
  send: () => void;
  // send(printjobid);
  print: (
    canvas: HTMLCanvasElement,
    cut: boolean | undefined,
    mode: "mono",
    printJobId?: string
  ) => void;
  // Status monitor
  startMonitor: () => void;
  stopMonitor: () => void;
  // Reception of result
  onreceive: (response: OnReceiveResponse) => void;
  onstatuschange: (status: number) => void;
  ononline: () => void;
  onoffline: () => void;
  onpoweroff: () => void;
  oncoverok: () => void;
  oncoveropen: () => void;
  onpaperok: () => void;
  onpapernearend: () => void;
  onpaperend: () => void;
  ondrawerclosed: () => void;
  ondraweropen: () => void;
}

const displayMessage = ({
  message,
  severity = "success",
  time = 5000,
}: {
  message: string;
  severity?: string;
  time?: number;
}) => {
  store.dispatch(
    createNotification({
      message,
      severity,
      time,
    })
  );
};

const callbackCreateDeviceCodeMessageMap: Record<
  CallbackCreateDeviceCode,
  string
> = {
  DEVICE_IN_USE: "Impresora en uso, no se puede conectar",
  DEVICE_NOT_FOUND: "Impresora disponible no encontrada",
  DEVICE_OPEN_ERROR: "Error con la impresora",
  DEVICE_TYPE_INVALID: "Impresora invalida",
  SYSTEM_ERROR: "Error desconocido con la impresora",
  PARAM_ERROR: "Errores con los parametros",
  OK: PRINTER_STATUS.CONNECTED,
};

const connectCallbackCodeMessageMap: Record<
  ConnectCallbackCode,
  string | null
> = {
  ERROR_TIMEOUT: "Error en conexión, tiempo de espera agotado",
  ERROR_PARAMETER: "Error con los parametros de conexión",
  SSL_CONNECT_OK: null,
  OK: null,
};

const deleteDeviceCallbackCodeMessageMap: Record<
  DeleteDeviceCallbackCode,
  string | null
> = {
  OK: null,
  SYSTEM_ERROR: "Error desconocido con la impresora",
  DEVICE_NOT_OPEN: "La impresora no estaba conectada",
  DEVICE_CLOSE_ERROR: "Falló la desconexión con la impresora",
};

const statusDeviceCodeMessageMap: Record<
  number,
  {
    notification: {
      message: string;
      severity: "error" | "warning" | "success";
      time: number;
    } | null;
    callback?: () => void;
  } | null
> = {
  [printerStatusCode.ASB_NO_RESPONSE]: {
    notification: {
      message: "El impresora no response",
      time: 60000,
      severity: "error",
    },
    callback: () =>
      store.dispatch(
        changeAvailable({
          available: false,
          tooltipMessage: PRINTER_STATUS.DISCONNECTED,
        })
      ),
  },
  [printerStatusCode.ASB_PRINT_SUCCESS]: {
    notification: null,
    callback: () => {
      if (store.getState().printer.printerPrinting)
        store.dispatch(printing(false));
    },
  },
  [printerStatusCode.ASB_DRAWER_KICK]: null,
  [printerStatusCode.ASB_OFF_LINE]: null,
  [printerStatusCode.ASB_COVER_OPEN]: null,
  [printerStatusCode.ASB_PAPER_FEED]: null,
  [printerStatusCode.ASB_WAIT_ON_LINE]: null,
  [printerStatusCode.ASB_PANEL_SWITCH]: null,
  [printerStatusCode.ASB_MECHANICAL_ERR]: null,
  [printerStatusCode.ASB_AUTOCUTTER_ERR]: null,
  [printerStatusCode.ASB_UNRECOVER_ERR]: null,
  [printerStatusCode.ASB_AUTORECOVER_ERR]: null,
  [printerStatusCode.ASB_RECEIPT_NEAR_END]: null,
  [printerStatusCode.ASB_RECEIPT_END]: {
    notification: {
      message: "El papel de la impresora se ha acabado",
      time: 60000,
      severity: "warning",
    },
    callback: () =>
      store.dispatch(
        changeAvailable({
          available: false,
          tooltipMessage: "Impresora sin papel",
        })
      ),
  },
  [printerStatusCode.ASB_BUZZER]: null,
  [printerStatusCode.ASB_WAIT_REMOVE_LABEL]: null,
  [printerStatusCode.ASB_NO_LABEL]: null,
  [printerStatusCode.ASB_SPOOLER_IS_STOPPED]: null,
  [printerStatusCode.DRAWER_OPEN_LEVEL_LOW]: null,
  [printerStatusCode.DRAWER_OPEN_LEVEL_HIGH]: null,
};

const displayStatusMessage = (
  statusCode: number,
  printerCodeAttribute: number
) => {
  if (statusCode & printerCodeAttribute) {
    const messageObject = statusDeviceCodeMessageMap[printerCodeAttribute];
    if (messageObject) {
      if (messageObject.notification)
        displayMessage(messageObject.notification);
      if (messageObject.callback) messageObject.callback();
    }
  }
};

export const useEpsonPrinter = () => {
  const ePosDeviceRef = useRef<EPOSDevice>();
  const printerRef = useRef<Printer>();
  const setPrinterAvailable = (available: boolean, tooltipMessage: string) =>
    store.dispatch(changeAvailable({ available, tooltipMessage }));
  const setPrinting = (isPrinting: boolean) => {
    store.dispatch(printing(isPrinting));
  };
  // @ts-ignore
  const ePosDev: EPOSDevice = new window.epson.ePOSDevice();
  ePosDeviceRef.current = ePosDev;

  const startMonitor = () => {
    const printer = printerRef.current;
    if (printer) {
      printer.interval = 30000;
      printer.startMonitor();
    }
  };
  // const stopMonitor = () => {
  //   const printer = printerRef.current;
  //   if (printer) {
  //     printer.stopMonitor();
  //   }
  // };

  const callbackDeleteDevice = (code: DeleteDeviceCallbackCode) => {
    const message = deleteDeviceCallbackCodeMessageMap[code];
    if (message) displayMessage({ message, severity: "error", time: 60000 });
    ePosDev.disconnect();
  };

  const handleOnStatusChange = (printer: Printer, status: number) => {
    displayStatusMessage(status, printer.ASB_NO_RESPONSE);
    displayStatusMessage(status, printer.ASB_PRINT_SUCCESS);
    displayStatusMessage(status, printer.ASB_DRAWER_KICK);
    displayStatusMessage(status, printer.ASB_OFF_LINE);
    displayStatusMessage(status, printer.ASB_COVER_OPEN);
    displayStatusMessage(status, printer.ASB_PAPER_FEED);
    displayStatusMessage(status, printer.ASB_WAIT_ON_LINE);
    displayStatusMessage(status, printer.ASB_PANEL_SWITCH);
    displayStatusMessage(status, printer.ASB_MECHANICAL_ERR);
    displayStatusMessage(status, printer.ASB_AUTOCUTTER_ERR);
    displayStatusMessage(status, printer.ASB_UNRECOVER_ERR);
    displayStatusMessage(status, printer.ASB_AUTORECOVER_ERR);
    displayStatusMessage(status, printer.ASB_RECEIPT_NEAR_END);
    displayStatusMessage(status, printer.ASB_RECEIPT_END);
    displayStatusMessage(status, printer.ASB_BUZZER);
    displayStatusMessage(status, printer.ASB_SPOOLER_IS_STOPPED);
  };

  const callbackCreateDevice = (
    printerDevice: Printer,
    code: CallbackCreateDeviceCode
  ) => {
    const message = callbackCreateDeviceCodeMessageMap[code];
    if (!printerDevice) {
      displayMessage({
        message,
        severity: "error",
        time: 60000,
      });
    }
    switch (code) {
      case "OK":
        printerRef.current = printerDevice;
        const printer = printerRef.current;
        startMonitor();

        setPrinterAvailable(true, "En Línea");
        displayMessage({
          message,
        });

        printer.onreceive = ({ success, code: onReceiveCode, status }) => {
          if (success) {
            handleOnStatusChange(printer, status);
          } else {
            displayMessage({
              message: `${PRINTER_STATUS.CONNECTION_FAILS} [${onReceiveCode}]`,
              severity: "error",
              time: 600000,
            });
          }
        };

        printer.onoffline = () => {
          setPrinterAvailable(false, "Impresora sin conexión");
          displayMessage({
            message: "La impresora esta fuera de línea!",
            severity: "warning",
            time: 60000,
          });
        };

        printer.onpaperend = () => {
          setPrinterAvailable(false, "El papel se ha terminado");
          displayMessage({
            message: "Alimente de papel la impresora!",
            severity: "warning",
            time: 60000,
          });
        };

        printer.ononline = () => {
          setPrinterAvailable(true, "En Línea");
        };

        printer.onpoweroff = () => {
          setPrinterAvailable(false, "Impresora Apagada");
        };

        printer.oncoveropen = () => {
          setPrinterAvailable(false, "Impresora Abierta");
          displayMessage({
            message: "La impresora esta abierta!",
            severity: "warning",
            time: 60000,
          });
        };

        printer.oncoverok = () => {
          setPrinterAvailable(true, "En Línea");
          displayMessage({
            message: PRINTER_STATUS.CONNECTED,
          });
        };

        printer.onstatuschange = (status) => {
          handleOnStatusChange(printer, status);
        };
        break;
      default:
        break;
    }
  };

  const callbackConnect = (resultConnect: ConnectCallbackCode) => {
    const message = connectCallbackCodeMessageMap[resultConnect];
    if (message)
      displayMessage({
        message,
        severity: "error",
        time: 600000,
      });
    {
      switch (resultConnect) {
        case "OK":
          ePosDev.createDevice(
            "local_printer",
            ePosDev.DEVICE_TYPE_PRINTER,
            { crypto: false, buffer: true },
            callbackCreateDevice
          );
          break;
        default:
          break;
      }
    }
  };

  const connect = ({
    printerIPAddress,
    printerPort,
  }: {
    printerIPAddress: string;
    printerPort: 8008 | 8043;
  }) => {
    store.dispatch(displayOnMenu(true));
    ePosDev.connect(printerIPAddress, printerPort, callbackConnect, {
      eposprint: true,
    });
    ePosDev.ondisconnect = () => {
      displayMessage({
        message: PRINTER_STATUS.DISCONNECTED,
        severity: "error",
        time: 60000,
      });
      store.dispatch(resetState());
    };
  };

  useEffect(() => {
    return () => {
      if (printerRef.current) {
        ePosDev.deleteDevice(printerRef.current, callbackDeleteDevice);
      } else {
        store.dispatch(resetState());
      }
    };
    // eslint-disable-next-line
  }, []);
  const isPrinting = useSelector(printerPrintingState);
  const isOnline = useSelector(printerAvailableState);
  return {
    connect,
    ePosDevice: ePosDev,
    setPrinting: () => setPrinting(true),
    isPrinting,
    isOnline,
    isAvailableToPrint: !isPrinting && isOnline,
    printer: printerRef.current,
  };
};
