import React, { useEffect, useState } from "react";
import { API_ROUTES, INSTANCES_NAMES, diffDates } from "@utils/index";
import { useCRUDGenericApiCall } from "@hooks/index";
import {
  DetailViewGeneric,
  DetailViewEscortServices,
  DetailViewEscortImageList,
} from "@components/index";
import { Escort, EscortService, EscortImage } from "@dbTypes/escorts";
import { useParams } from "react-router-dom";
import { uploadEscortImage } from "@api/user";
import { addEscortService, removeEscortService } from "@api/index";

const DetailViewEscort: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [instanceData, setInstanceData] = useState<Escort | null>(null);
  const [servicesData, setServicesData] = useState<EscortService[]>([]);
  const [imagesData, setImagesData] = useState<EscortImage[]>([]);
  const { fetch } = useCRUDGenericApiCall<Escort>(API_ROUTES.USER);
  const {
    fetchAll: fetchAllImages,
    destroy: deleteImage,
    edit: editImage,
  } = useCRUDGenericApiCall<EscortImage>(API_ROUTES.ESCORT_IMAGES);
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
  const fetchImages = async () => {
    const images = await fetchAllImages({
      extended_user__user_id: id,
      ordering: "-created",
    });
    setImagesData(images);
  };
  useEffect(() => {
    const fetchData = async () => {
      const [escort, services, images] = await Promise.all([
        fetch(id),
        fetchAllServices(),
        fetchAllImages({ extended_user__user_id: id, ordering: "-created" }),
      ]);
      setServicesData(services);
      setInstanceData(escort);
      setImagesData(images);
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
  const onUploadImage = async (file: Blob) => {
    await uploadEscortImage(id, file);
    await fetchImages();
  };
  const onDeleteImage = async (imageId: number) => {
    await deleteImage(imageId);
    await fetchImages();
  };
  const onEditPublishedWeb = async (imageId: number, publishedWeb: boolean) => {
    await editImage(imageId, { publishedWeb });
    await fetchImages();
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
      <DetailViewEscortImageList
        images={imagesData}
        uploadImage={onUploadImage}
        deleteImage={onDeleteImage}
        setPublished={onEditPublishedWeb}
      />
    </DetailViewGeneric>
  );
};

export default DetailViewEscort;
