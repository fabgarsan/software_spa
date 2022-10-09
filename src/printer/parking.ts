import { Printer } from "@hooks/useEpsonPrinter";
import {
  displayHoursAndMinutesFromMinutes,
  formatIntoMoney,
  toHumanDateTime,
} from "@utils/functions";
import { PrintInvoiceResponse } from "@api/parking";

export interface PrintParkingCarTicket {
  licensePlate: string;
  datetime: string;
  type: string;
}

export const printParkingCarTicket = ({
  data: { licensePlate, datetime, type },
  printer,
}: {
  printer: Printer;
  data: PrintParkingCarTicket;
}) => {
  printer.addTextAlign("center");
  printer.addText("Servicio Parqueadero\n");
  printer.addTextSize(2, 2);
  printer.addText(`${type}\n`);
  printer.addTextSize(6, 6);
  printer.addText(`${licensePlate}\n`);
  printer.addTextSize(1, 1);
  printer.addTextAlign("right");
  printer.addText(`Ingreso: ${datetime}\n`);
  printer.addText("\n");
  printer.addTextAlign("center");
  printer.addText("POR FAVOR CONSERVE ESTE TIQUETE\n");
  printer.addText("SERÁ SOLICITADO AL MOMENTO DE\n");
  printer.addText("RETIRAR SU VEHÍCULO\n");
  printer.addFeed();
  printer.addCut("feed");
  printer.send();
};

export const printPOSInvoice = ({
  printer,
  data: {
    companyNit,
    companyName,
    cashierName,
    cashierUsername,
    uniqueInvoiceNumber,
    startDatetime,
    paymentDatetime,
    printCount,
    description,
    minutes,
    total,
    dianResolutionNumber,
    automaticRange,
  },
}: {
  printer: Printer;
  data: PrintInvoiceResponse;
}) => {
  printer.addTextAlign("center");
  printer.addTextSize(2, 2);
  printer.addText(`${companyName}\n`);
  printer.addTextSize(1, 1);
  printer.addText("Reservado\n");
  printer.addText(`Nit: ${companyNit}\n`);
  printer.addText("\n");
  printer.addTextSize(2, 2);
  printer.addText("Servicio de Parqueadero\n");
  printer.addText("\n");
  printer.addTextSize(1, 1);
  printer.addText(`Factura de venta: ${uniqueInvoiceNumber}\n`);
  printer.addText(
    `Resolución DIAN #${dianResolutionNumber} ${automaticRange}\n`
  );
  printer.addText("\n");
  printer.addTextAlign("left");
  printer.addText(`Vendedor: ${cashierName}\n`);
  printer.addText(`${cashierUsername}\n`);
  printer.addTextAlign("center");
  printer.addText("-----------------------------\n");
  printer.addTextSize(2, 2);
  printer.addText("Detalle de venta\n");
  printer.addText("\n");
  printer.addTextSize(1, 1);
  printer.addText(`${description}\n`);
  printer.addText("\n");
  printer.addTextAlign("right");
  printer.addText(`Ingreso: ${toHumanDateTime(startDatetime)}\n`);
  printer.addText(`Salida: ${toHumanDateTime(paymentDatetime)}\n`);
  printer.addText("\n");
  printer.addTextAlign("center");
  printer.addText(`Tiempo: ${displayHoursAndMinutesFromMinutes(minutes)}\n`);
  printer.addText(`Total: ${formatIntoMoney(total)}\n`);

  printer.addTextAlign("center");
  printer.addText("-----------------------------\n");
  printer.addTextAlign("right");
  printer.addText(`Número de impresión: ${printCount}\n`);
  printer.addFeed();
  printer.addCut("feed");
  printer.send();
};
