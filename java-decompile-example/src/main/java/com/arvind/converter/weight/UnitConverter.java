package com.arvind.converter.weight;

import com.arvind.converter.IUnitConverter;
import static com.arvind.converter.constants.Constants.*;

public class UnitConverter implements IUnitConverter {

    String fromUnit;
    String toUnit;

    public UnitConverter(String fromUnit, String toUnit) {
        this.fromUnit = fromUnit;
        this.toUnit = toUnit;
    }

    public double convert(double val) {
        double grams = toGrams(val);
        double converted = fromGrams(grams);

        return converted;
    }

    private double toGrams(double val) {
        double grams;

        if (fromUnit.equals(POUNDS)) {
            grams = val * POUNDS_TO_GRAMS;
        } else if (fromUnit.equals(KILOGRAMS)) {
            grams = val * KILOGRAMS_TO_GRAMS;
        } else if (fromUnit.equals(OUNCES)) {
            grams = val * OUNCES_TO_GRAMS;
        } else if (fromUnit.equals(MILLIGRAMS)) {
            grams = val * MILLIGRAMS_TO_GRAMS;
        } else if (fromUnit.equals(TONNES)) {
            grams = val * TONNES_TO_GRAMS;
        } else {
            grams = val * GRAMS_TO_GRAMS;
        }

        return grams;
    }

    private double fromGrams(double grams) {
        double converted;

        if (toUnit.equals(POUNDS)) {
            converted = Math.round(grams * GRAMS_TO_POUNDS);
        } else if (toUnit.equals(KILOGRAMS)) {
            converted = Math.round(grams * GRAMS_TO_KILOGRAMS);
        } else if (toUnit.equals(OUNCES)) {
            converted = Math.round(grams * GRAMS_TO_OUNCES);
        } else if (toUnit.equals(MILLIGRAMS)) {
            converted = Math.round(grams * GRAMS_TO_MILLIGRAMS);
        } else if (toUnit.equals(TONNES)) {
            converted = Math.round(grams * GRAMS_TO_TONNES);
        } else {
            converted = Math.round(grams * GRAMS_TO_GRAMS);
        }

        return converted;
    }
}