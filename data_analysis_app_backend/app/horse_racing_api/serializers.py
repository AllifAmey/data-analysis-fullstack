from rest_framework import serializers


class HorseRacingSerializer(serializers.Serializer):
    """Serializes horse racing endpoint"""

    region_code = serializers.CharField(max_length=4)

    def validate_region_code(self, value):
        """
        Validates region code
        """
        valid_region_codes = ["aut", "nz", "fr", "usa", "cze",
                              "spa", "yug", "slo", "cyp", "saf", "gue",
                              "ger", "den", "bel", "mac", "bar", "jer", "gr",
                              "mal", "gb", "kor", "ksa", "pan", "brz", "mau",
                              "uru", "can", "ire", "chi", "bhr", "swi", "ind",
                              "jpn", "arg", "aus", "sin", "uae", "swe", "hol",
                              "chn", "isr", "mor", "pr", "hun", "tur", "per",
                              "hk", "bul", "svn", "qa", "pol", "ity", "omn",
                              "rus", "nor"]

        if value not in valid_region_codes:
            raise serializers.ValidationError("Not valid region code")
        return value
