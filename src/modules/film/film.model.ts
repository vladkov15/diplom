import { IContent, IDrmLicenceServers, IWatchInfo } from '../../models/content'

// tslint:disable-next-line
export interface IFilm extends IContent, IDrmLicenceServers {
  watching_info: IFilmWatchInfo | null
}

export interface IFilmWatchInfo extends IWatchInfo {}
