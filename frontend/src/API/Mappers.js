
export function transformDrawingActionToShape(dto) {

    if (!dto || !dto.shape) {
      throw new Error('Invalid DTO: shape is required');
    }
  
    const transformedShape = {
      type: dto.type,
      id: dto.shape.id, 
      attributes: {}
    };

    for (const [key, value] of Object.entries(dto.shape)) {
      if (key !== 'id') {
        transformedShape.attributes[key] = value;
      }
    }
  
    return transformedShape;
}


export function transformShapeToDrawingActionDto(shape, paintId, action) {

    if (!shape || !shape.type || !shape.id || !shape.attributes) {
      throw new Error('Invalid shape object: type, id, and attributes are required');
    }
  
    const dto = {
      type: shape.type,
      paintId: paintId,
      action: action,
      shape: {
        id: shape.id
      }
    };
  

    for (const [key, value] of Object.entries(shape.attributes)) {
        dto.shape[key] = value;
    }
  
    return dto;
  }
  

