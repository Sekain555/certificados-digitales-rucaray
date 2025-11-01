
export interface InspectionItem {
  id: string;
  requirement: string;
}

export const inspectionItemsBySection: Record<string, InspectionItem[]> = {
  "Limpieza y Sanitización de Superficies": [
    { id: "s1", requirement: "Las superficies de contacto se encuentran limpias (Sin polvo u olores extraños)." },
    { id: "s2", requirement: "Los pisos se encuentran limpios." },
    { id: "s3", requirement: "Las paredes se encuentran libres de restos de fruta, sellos, envases, etc." },
    { id: "s4", requirement: "Los baños se encuentran limpios y con agua, papel higiénico, jabón, toalla para manos, Alcohol gel." },
    { id: "s5", requirement: "En sector de percheros no existen, mochilas, carteras o similar." },
    { id: "s6", requirement: "Los elementos de limpieza se encuentran correctamente segregados por área." },
    { id: "s7", requirement: "Los elementos de limpieza son almacenados de forma higiénica y segura." },
    { id: "s8", requirement: "Los elementos de limpieza se limpian y sanitizan antes de almacenarlos." },
  ],
  "Aspectos de Higiene del Personal": [
    { id: "p1", requirement: "El personal de las salas de proceso se encuentra usando el uniforme de manera correcta." },
    { id: "p2", requirement: "El personal se lava las manos al ingreso a la sala de proceso." },
    { id: "p3", requirement: "La ropa personal se encuentra separada del uniforme." },
  ],
  "Prevención de la Contaminación Cruzada": [
    { id: "cc1", requirement: "Basureros de la sala de proceso están limpios y las tapas son de acción no manual." },
    { id: "cc2", requirement: "No hay en la sala de proceso cortacartones." },
    { id: "cc3", requirement: "Las grasas y aceites h1 se encuentran bien almacenados." },
    { id: "cc4", requirement: "La zona de residuos se encuentra ordenada con los residuos dentro de los contenedores. Los contenedores están con tapa." },
    { id: "cc5", requirement: "Todas las luminarias y vidrios se encuentran con protecciones." },
    { id: "cc6", requirement: "Los productos químicos se encuentran rotulados. Están almacenados con llave y los parcialmente utilizados están cerrados." },
    { id: "cc7", requirement: "Todo el personal, además de las visitas, llevan ropa de protección que incluya al menos delantal y cofia." },
    { id: "cc8", requirement: "El uniforme está en buen estado y libre de botones, bolsillos en la parte superior." },
    { id: "cc9", requirement: "Bandejas y contenedores de material limpios y rotulados según corresponda." },
  ],
  "Control de Plagas": [
    { id: "cp1", requirement: "Todas las cebaderas se encuentran en su lugar y en buenas condiciones." },
    { id: "cp2", requirement: "Las cebaderas están ancladas." },
    { id: "cp3", requirement: "Lamas, mallas y puertas de acceso sector A." },
    { id: "cp4", requirement: "Lamas, mallas y puertas de acceso sector B." },
    { id: "cp5", requirement: "Lamas, mallas y puertas de acceso sector C." },
    { id: "cp6", requirement: "Lamas, mallas y puertas de acceso sector D." },
    { id: "cp7", requirement: "Lamas, mallas y puertas de acceso Packing." },
    { id: "cp8", requirement: "Lamas, mallas y puertas de acceso sector Bodegas." },
  ],
  "Gestión de Residuos": [
    { id: "gr1", requirement: "En zona de proceso y almacenamiento los contenedores de residuos, son de material lavable, con tapa y sin perforaciones." },
  ],
  "Recepción y Almacenamiento de Materiales": [
    { id: "ra1", requirement: "Los materiales se mantienen sellados, si están a medio usar se protegen del deterioro." },
    { id: "ra2", requirement: "Los materiales no conforme están identificados." },
  ],
  "Control de Proceso": [
    { id: "cpro1", requirement: "Los registros de control de etiquetado están siendo realizados." },
    { id: "cpro2", requirement: "Los registros de control de personal están completos y dentro de los rangos esperados." },
    { id: "cpro3", requirement: "Los registros de control de calidad completos y dentro de los rangos esperados." },
  ],
  "Monitoreo del PCC": [
    { id: "pcc1", requirement: "Los registros asociados al control de puntos críticos PCC están completos y dentro de los rangos esperados." },
    { id: "pcc2", requirement: "Los contenedores de sanitizante, ceras, fungicidas, se encuentran con candado." },
  ],
  "Infraestructura": [
    { id: "i1", requirement: "Las paredes, techo y piso de la sala de proceso se encuentran en buen estado de mantención." },
    { id: "i2", requirement: "Las paredes, techo y piso del área almacenaje de materia prima se encuentran en buen estado de mantención." },
    { id: "i3", requirement: "Las paredes, techo y piso del área almacenaje de Producto terminado se encuentran en buen estado de mantención." },
    { id: "i4", requirement: "El área de vaciado se encuentra en buen estado de mantención." },
    { id: "i5", requirement: "Los servicios sanitarios se encuentran operativos y en buen estado de mantención." },
  ],
};
