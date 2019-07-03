package com.arvind.converter.distance;

import static com.arvind.converter.constants.Constants.*;
import com.arvind.converter.IUnitConverter;

public class UnitConverter implements IUnitConverter {

    String fromUnit;
    String toUnit;

    public UnitConverter(String fromUnit, String toUnit) {
        this.fromUnit = fromUnit;
        this.toUnit = toUnit;
    }

    public double convert(double val) {
        double meters = toMeters(val);
        double converted = fromMeters(meters);

        return converted;
    }

    private double toMeters(double val) {
        double meters;

        if (fromUnit.equals(INCHES)) {
            meters = val * INCHES_TO_METERS;
        } else if (fromUnit.equals(FEETS)) {
            meters = val * FEETS_TO_METERS;
        } else if (fromUnit.equals(MILES)) {
            meters = val * MILES_TO_METERS;
        } else if (fromUnit.equals(MILLIMETERS)) {
            meters = val * MILLIMETERS_TO_METERS;
        } else if (fromUnit.equals(CENTIMETERS)) {
            meters = val * CENTIMETERS_TO_METERS;
        } else if (fromUnit.equals(KILOMETERS)) {
            meters = val * KILOMETERS_TO_METERS;
        } else {
            meters = val * METERS_TO_METERS;
        }

        return meters;
    }

    private double fromMeters(double meters) {
        double converted;

        if (toUnit.equals(INCHES)) {
            converted = Math.round(meters * METERS_TO_INCHES);
        } else if (toUnit.equals(FEETS)) {
            converted = Math.round(meters * METERS_TO_FEETS);
        } else if (toUnit.equals(MILES)) {
            converted = Math.round(meters * METERS_TO_MILES);
        } else if (toUnit.equals(MILLIMETERS)) {
            converted = Math.round(meters * METERS_TO_MILLIMETERS);
        } else if (toUnit.equals(CENTIMETERS)) {
            converted = Math.round(meters * METERS_TO_CENTIMETERS);
        } else if (toUnit.equals(KILOMETERS)) {
            converted = Math.round(meters * METERS_TO_KILOMETERS);
        } else {
            converted = Math.round(meters * METERS_TO_METERS);
        }

        return converted;
    }
}