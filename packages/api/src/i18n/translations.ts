import { getLanguagePartFromCode } from '../utils/translations'

export default (locale, params) => {
  const language = getLanguagePartFromCode(locale)

  switch (language) {
    case 'da':
      return {
        COMMENT_UPDATES: `${params.name} kommenterede også ${params.owner} indlæg.`,
        NEW_COMMENT_LIKE: `${params.name} gav en gnist til din kommentar.`,
        NEW_COMMENT: `${params.name} kommenterede: ${params.comment} på dit indlæg.`,
        NEW_FOLLOWER: `${params.name} følger nu dit projekt: ${params.project}.`,
        NEW_MENTION: `${params.name} nævnte dig i en kommentar: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} gav en gnist til dit indlæg.`,
        NEW_REPLY: `${params.name} svarede på din kommentar: ${params.comment}.`,
      }
    case 'de':
      return {
        COMMENT_UPDATES: `${params.name} hat auch den Beitrag ${params.owner} kommentiert.`,
        NEW_COMMENT_LIKE: `${params.name} gab ihrem kommentar einen funken.`,
        NEW_COMMENT: `${params.name} kommentar: ${params.comment} zu ihrem beitrag.`,
        NEW_FOLLOWER: `${params.name} folgt nun ihrem projekt: ${params.project}.`,
        NEW_MENTION: `${params.name} erwähnte sie in einem kommentar: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} gab ihrem beitrag einen funken.`,
        NEW_REPLY: `${params.name} hat auf ihren kommentar geantwortet: ${params.comment}.`,
      }
    case 'es':
      return {
        COMMENT_UPDATES: `${params.name} también comentó en la publicación de ${params.owner}.`,
        NEW_COMMENT_LIKE: `${params.name} dio una chispa a tu comentario.`,
        NEW_COMMENT: `${params.name} comentó: ${params.comment} en tu publicación.`,
        NEW_FOLLOWER: `${params.name} ahora está siguiendo su proyecto: ${params.project}.`,
        NEW_MENTION: `${params.name} te mencionó en un comentario: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} dio una chispa a tu publicación.`,
        NEW_REPLY: `${params.name} respondió a su comentario: ${params.comment}.`,
      }
    case 'fr':
      return {
        COMMENT_UPDATES: `${params.name} a également commenté le message de ${params.owner}.`,
        NEW_COMMENT_LIKE: `${params.name} a donné une étincelle à votre commentaire.`,
        NEW_COMMENT: `${params.name} a commenté: ${params.comment} sur votre message.`,
        NEW_FOLLOWER: `${params.name} suit maintenant votre projet: ${params.project}.`,
        NEW_MENTION: `${params.name} vous a mentionné dans un commentaire: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} a donné une étincelle à votre message.`,
        NEW_REPLY: `${params.name} a répondu à votre commentaire: ${params.comment}.`,
      }
    case 'it':
      return {
        COMMENT_UPDATES: `${params.name} ha anche commentato il post di ${params.owner}.`,
        NEW_COMMENT_LIKE: `${params.name} ha dato una scintilla al tuo commento.`,
        NEW_COMMENT: `${params.name} ha commentato: ${params.comment} sul tuo post.`,
        NEW_FOLLOWER: `${params.name} sta ora seguendo il tuo progetto: ${params.project}.`,
        NEW_MENTION: `${params.name} ti ha menzionato in un commento: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} ha dato una scintilla al tuo post.`,
        NEW_REPLY: `${params.name} ha risposto al tuo commento: ${params.comment}.`,
      }
    case 'nl':
      return {
        COMMENT_UPDATES: `${params.name} heeft ook gereageerd op ${params.owner} post.`,
        NEW_COMMENT_LIKE: `${params.name} gaf een vonk aan uw opmerking.`,
        NEW_COMMENT: `${params.name} heeft gereageerd: ${params.comment} op je bericht.`,
        NEW_FOLLOWER: `${params.name} volgt nu uw project: ${params.project}.`,
        NEW_MENTION: `${params.name} noemde je in een opmerking: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} gaf een vonk aan je bericht.`,
        NEW_REPLY: `${params.name} reageerde op uw opmerking: ${params.comment}.`,
      }
    case 'no':
      return {
        COMMENT_UPDATES: `${params.name} kommenterte også ${params.owner} innlegg.`,
        NEW_COMMENT_LIKE: `${params.name} ga en gnist til kommentaren din.`,
        NEW_COMMENT: `${params.name} kommenterte: ${params.comment} på innlegget ditt.`,
        NEW_FOLLOWER: `${params.name} følger nå prosjektet ditt: ${params.project}.`,
        NEW_MENTION: `${params.name} nevnte deg i en kommentar: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} ga en gnist til innlegget ditt.`,
        NEW_REPLY: `${params.name} svarte på kommentaren din: ${params.comment}.`,
      }
    case 'pt':
      return {
        COMMENT_UPDATES: `${params.name} também comentou na postagem de ${params.owner}.`,
        NEW_COMMENT_LIKE: `${params.name} deu uma faísca em seu comentário.`,
        NEW_COMMENT: `${params.name} comentou: ${params.comment} em sua postagem.`,
        NEW_FOLLOWER: `${params.name} agora está acompanhando seu projeto: ${params.project}.`,
        NEW_MENTION: `${params.name} mencionou você em um comentário: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} deu uma faísca em sua postagem.`,
        NEW_REPLY: `${params.name} respondeu ao seu comentário: ${params.comment}.`,
      }
    case 'ru':
      return {
        COMMENT_UPDATES: `${params.name} также прокомментировал сообщение ${params.owner}.`,
        NEW_COMMENT_LIKE: `${params.name} дал искру вашему комментарию.`,
        NEW_COMMENT: `${params.name} прокомментировал: ${params.comment} к вашему сообщению.`,
        NEW_FOLLOWER: `${params.name} теперь подписан на ваш проект: ${params.project}.`,
        NEW_MENTION: `${params.name} упомянул вас в комментарии: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} дал искру вашему посту.`,
        NEW_REPLY: `${params.name} ответил на ваш комментарий: ${params.comment}.`,
      }
    case 'ti':
      return {
        COMMENT_UPDATES: `${params.name} nagkomento din sa post na ${params.owner}.`,
        NEW_COMMENT_LIKE: `${params.name} nagbigay ng spark sa iyong puna.`,
        NEW_COMMENT: `${params.name} nagkomento: ${params.comment} sa iyong post.`,
        NEW_FOLLOWER: `${params.name} sumusunod na sa iyong proyekto: ${params.project}.`,
        NEW_MENTION: `${params.name} binanggit ka sa isang komento: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} nagbigay ng spark sa post mo.`,
        NEW_REPLY: `${params.name} tumugon sa iyong puna: ${params.comment}.`,
      }
    case 'sv':
      return {
        COMMENT_UPDATES: `${params.name} also commented on ${params.owner} post.`,
        NEW_COMMENT_LIKE: `${params.name} gav en gnista på din kommentar.`,
        NEW_COMMENT: `${params.name} kommenterade: ${params.comment} på ditt inlägg.`,
        NEW_FOLLOWER: `${params.name} följer nu ditt projekt: ${params.project}.`,
        NEW_MENTION: `${params.name} nämnde dig i en kommentar: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} gav en gnista på ditt inlägg.`,
        NEW_REPLY: `${params.name} svarade på din kommentar: ${params.comment}.`,
      }
    default:
      return {
        COMMENT_UPDATES: `${params.name} also commented on ${params.owner} post.`,
        NEW_COMMENT_LIKE: `${params.name} sparked your comment.`,
        NEW_COMMENT: `${params.name} commented: ${params.comment} on your post.`,
        NEW_FOLLOWER: `${params.name} started following your project: ${params.project}.`,
        NEW_MENTION: `${params.name} mentioned you in a comment: ${params.comment}.`,
        NEW_POST_LIKE: `${params.name} sparked your post.`,
        NEW_REPLY: `${params.name} replied to your comment: ${params.comment}.`,
      }
  }
}
