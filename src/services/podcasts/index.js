// @ts-check
import { dayjs, xmlParse, htmlParse } from "utils/index";
import { RSS_URL, PODCAST_STATE } from "constants/index";

/**
 * @param {Element} item
 */
function _extractPodcastInfo(item) {
  const title = item?.querySelector("title")?.textContent || "";

  const descriptionNode = htmlParse(
    item?.querySelector("description").textContent || ""
  );

  const description =
    descriptionNode.querySelector("strong")?.textContent ?? "";

  const dateNode = item.querySelector("pubDate");

  if (!dateNode) {
    throw new Error("Can't parse date");
  }

  const date = dayjs().to(dayjs(dateNode.textContent));

  const image = item.querySelector("image");
  const artwork = image?.getAttribute("href") ?? null;

  const link = item.querySelector("enclosure");

  let seconds = item?.querySelector("duration")?.innerHTML ?? "0";

  const duration = Math.round(Number.parseInt(seconds, 10) / 60);

  const time = 15; // debería consultar la base de datos

  /** @type {?string} materialLink */
  const materialLink = null; // debería consultar la base de datos

  const state = PODCAST_STATE.initial;

  return {
    title,
    description,
    date,
    artwork,
    link,
    duration,
    time,
    materialLink,
    state,
  };
}

/**
 * @returns {Promise<import('services/index').Podcast[]>}
 */
export async function getAll() {
  const response = await fetch(RSS_URL);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const xmlContent = await response.text();
  const xml = xmlParse(xmlContent);
  const items = xml.querySelectorAll("item");

  return Array.from(items).map(_extractPodcastInfo);
}
