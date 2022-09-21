class PaginatonHelper():

    @classmethod
    def get_pagination(page, per_page):
        if not page:
            page = 1
        if not per_page:
            per_page = 10
        return int(page), int(per_page)
