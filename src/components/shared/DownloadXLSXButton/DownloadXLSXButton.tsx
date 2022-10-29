import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { exportToXLSX } from "@utils/functions";

export const DownloadXLSXButton = ({
  apiData,
  fileName,
  columns,
  mapHeaderNames,
  headerOrder,
}: {
  apiData: unknown[];
  fileName: string;
  columns?: string[];
  mapHeaderNames?: { [key: string]: string };
  headerOrder?: string[];
}) => (
  <Button
    variant="contained"
    color="primary"
    disabled={!Boolean(apiData.length)}
    endIcon={<FontAwesomeIcon icon={["fal", "file-spreadsheet"]} />}
    onClick={() =>
      exportToXLSX({
        apiData,
        fileName,
        columns,
        mapHeaderNames,
        headerOrder,
      })
    }
  >
    Descargar xlsx
  </Button>
);
