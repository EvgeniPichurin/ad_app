package exam.advertising.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Advertisement implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    public Integer id;
    @NotEmpty
    @Pattern(regexp = "^[A-Z][a-zA-Z]*$",
            message = "Category name must start with a capital letter and contains letters only")
    public String categoryName;
    @NotNull
    @Positive(message = "Only positive value")
    public Double price;
    @NotEmpty
    public String itemName;
    public String itemDetails;
}
