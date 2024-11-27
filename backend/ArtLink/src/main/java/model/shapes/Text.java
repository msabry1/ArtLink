package model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Text extends Shape2d {
    private String text;
    private String fontSize;
    private String fontFamily;
}
