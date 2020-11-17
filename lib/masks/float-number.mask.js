import BaseMask from "./_base.mask";
import VanillaMasker from "../internal-dependencies/vanilla-masker";

const FLOAT_NUMBER_MASK_SETTING = {
  precision: 2,
  separator: ",",
  delimiter: ".",
  unit: "R$",
  suffixUnit: "",
};

export default class FloatNumberMask extends BaseMask {
  static getType() {
    return "float-number";
  }

  getValue(value, settings, oldValue) {
    let mergedSettings = super.mergeSettings(
      FLOAT_NUMBER_MASK_SETTING,
      settings
    );

    let sanitized = this._sanitize(value, mergedSettings);

    if (mergedSettings.suffixUnit && oldValue && sanitized) {
      if (sanitized.length == oldValue.length - 1) {
        let cleared = this.removeNotNumbers(sanitized);
        sanitized = cleared.substr(0, cleared.length - 1);
      }
    }

    let masked = VanillaMasker.toFloatNumber(sanitized);

    return masked;
  }

  getRawValue(maskedValue, settings) {
    let mergedSettings = super.mergeSettings(
      FLOAT_NUMBER_MASK_SETTING,
      settings
    );
    let normalized = super.removeNotNumbers(maskedValue);

    let dotPosition = normalized.length - mergedSettings.precision;
    normalized = this._insert(normalized, dotPosition, ".");

    return Number(normalized);
  }

  validate(value, settings) {
    return true;
  }

  _sanitize(value, settings) {
    if (typeof value === "number") {
      return value.toFixed(settings.precision);
    }

    return value;
  }

  _insert(text, index, string) {
    if (index > 0) {
      return (
        text.substring(0, index) + string + text.substring(index, text.length)
      );
    } else {
      return string + text;
    }
  }
}
