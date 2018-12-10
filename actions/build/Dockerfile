FROM 10.14.1-alpine

LABEL version="1.0.0"
LABEL repository="http://github.com/culturehq/actions-yarn"
LABEL homepage="http://github.com/culturehq/actions-yarn"
LABEL maintainer="CultureHQ <support@culturehq.com>"

LABEL com.github.actions.name="GitHub Action for yarn"
LABEL com.github.actions.description="Wraps the yarn CLI to enable common yarn commands."
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="red"

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
