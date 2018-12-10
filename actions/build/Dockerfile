FROM alpine:3.8

LABEL version="1.0.0"
LABEL repository="http://github.com/culturehq/actions-yarn"
LABEL homepage="http://github.com/culturehq/actions-yarn"
LABEL maintainer="CultureHQ <support@culturehq.com>"

LABEL com.github.actions.name="GitHub Action for yarn"
LABEL com.github.actions.description="Wraps the yarn CLI to enable common yarn commands."
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="red"

RUN apk update
RUN apk add yarn

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["install"]
