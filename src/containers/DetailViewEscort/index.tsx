import React, { useEffect, useState } from "react";
import { API_ROUTES, INSTANCES_NAMES, diffDates } from "@utils/index";
import { useCRUDGenericApiCall } from "@hooks/index";
import { DetailViewGeneric, DetailViewEscortServices } from "@components/index";
import { Escort, EscortService } from "@dbTypes/escorts";
import { useParams } from "react-router-dom";
import { addEscortService, removeEscortService } from "@api/index";

const DetailViewEscort: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [instanceData, setInstanceData] = useState<Escort | null>(null);
  const [servicesData, setServicesData] = useState<EscortService[]>([]);
  const { fetch } = useCRUDGenericApiCall<Escort>(API_ROUTES.USER);
  const { fetchAll: fetchAllServices } = useCRUDGenericApiCall<EscortService>(
    API_ROUTES.ESCORT_SERVICES
  );
  const attributes = instanceData
    ? [
        { label: "Usuario", value: instanceData.username },
        {
          label: "Documento",
          value: `${instanceData.idType} ${instanceData.idNumber}`,
        },
        {
          label: "Nombre",
          value: `${instanceData.firstName} ${instanceData.lastName}`,
        },
        {
          label: "Edad",
          value: instanceData.dateOfBirth
            ? diffDates(new Date(), instanceData.dateOfBirth, "years")
            : "",
        },
        {
          label: "Fecha Nacimiento",
          value: instanceData.dateOfBirth.toString() || "",
        },
        { label: "Categoría", value: instanceData.categoryName },
        { label: "Pais", value: instanceData?.countryName || "" },
        { label: "Ciudad", value: instanceData?.cityName || "" },
      ]
    : [];
  useEffect(() => {
    const fetchData = async () => {
      const [escort, services] = await Promise.all([
        fetch(id),
        fetchAllServices(),
      ]);
      setServicesData(services);
      setInstanceData(escort);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const onCheckService = async (serviceId: number, checked: boolean) => {
    if (checked) await addEscortService(id, { serviceId });
    if (!checked) await removeEscortService(id, { serviceId });
    const data = await fetch(id);
    setInstanceData(data);
  };
  return (
    <DetailViewGeneric
      canView
      title={`${INSTANCES_NAMES.ESCORT_SINGULAR} ${instanceData?.alias}`}
      attributes={attributes}
    >
      {instanceData && servicesData?.length > 0 && (
        <DetailViewEscortServices
          currentServices={instanceData?.services}
          services={servicesData}
          onCheckService={onCheckService}
        />
      )}
    </DetailViewGeneric>
  );
};

export default DetailViewEscort;
