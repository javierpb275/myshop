class FiltrationHelper():

    @classmethod
    def remove_keys_with_empty_values(cls, dictionary):
        for key, value in dictionary.copy().items():
            if not value:
                dictionary.pop(key, None)
