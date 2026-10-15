package demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class CalculatorTest {
    private final Calculator calc = new Calculator();

    @Test
    void addsTwoNumbers() {
        assertEquals(5, calc.add(2, 3));
    }

    @Test
    void rejectsDivideByZero() {
        assertThrows(IllegalArgumentException.class, () -> calc.divide(1, 0));
    }

    @Test
    void dividesWholeNumbers() {
        assertEquals(4, calc.divide(12, 3));
    }

    @Test
    void divisionTruncatesTowardZero() {
        assertEquals(-2, calc.divide(-7, 3));
    }

    @Test
    void addsNegativeNumbers() {
        assertEquals(-5, calc.add(-2, -3));
    }
}
