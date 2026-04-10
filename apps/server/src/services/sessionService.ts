import Session, { ISession } from '../models/Session';

export class SessionService {
  static async createSession(data: Partial<ISession>) {
    return await Session.create(data);
  }

  static async getHistory(limit: number = 50) {
    return await Session.find().sort({ timestamp: -1 }).limit(limit);
  }

  static async getGlobalStats() {
    const sessions = await Session.find();
    const totalSessions = sessions.length;
    const avgAccuracy = totalSessions > 0
      ? sessions.reduce((acc, curr) => acc + curr.accuracy, 0) / totalSessions
      : 0;

    return {
      totalSessions,
      avgAccuracy: Math.round(avgAccuracy)
    };
  }
}
