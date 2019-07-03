package com.arvind.converter;

import java.util.Scanner;

import com.arvind.converter.distance.UnitConverter;

public class Converter {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Which converter you want to play with (distance, weight)?");
        boolean isItDistanceConverter = input.nextLine().equals("distance") ? true : false;

        if (isItDistanceConverter) {
            System.out.println("Convert from (in, ft, mi, mm, cm, m, km):");
        } else {
            System.out.println("Convert from (lb, kg, g, mg, oz, t):");
        }
        String fromUnit = input.nextLine();
        if (isItDistanceConverter) {
            System.out.println("Convert to (in, ft, mi, mm, cm, m, km): ");
        } else {
            System.out.println("Convert from (lb, kg, g, mg, oz, t):");
        }
        String toUnit = input.nextLine();
        IUnitConverter converter = null;

        if (isItDistanceConverter) {
            converter = new UnitConverter(fromUnit, toUnit);
        } else {
            converter = new com.arvind.converter.weight.UnitConverter(fromUnit, toUnit);
        }
        System.out.println("Value:");
        double val = input.nextDouble();
        double converted = converter.convert(val);
        System.out.println(val + " " + fromUnit + " = " + converted + " " + toUnit);
    }
}