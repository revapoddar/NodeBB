'use strict';

import * as util from 'util';
import * as db from '../database';
import * as plugins from '../plugins';

export const rewards: any = {};

rewards.checkConditionAndRewardUser = async function (params: { uid: string, condition: string, method: string }) {
    const { uid, condition, method } = params;
    const isActive = await isConditionActive(condition);
    if (!isActive) {
        return;
    }
    const ids = await getIDsByCondition(condition);
    let rewardData = await getRewardDataByIDs(ids);
    rewardData = await filterCompletedRewards(uid, rewardData);
    rewardData = rewardData.filter(Boolean);
    if (!rewardData || !rewardData.length) {
        return;
    }
    const eligible = await Promise.all(rewardData.map(reward => checkCondition(reward, method)));
    const eligibleRewards = rewardData.filter((reward, index) => eligible[index]);
    await giveRewards(uid, eligibleRewards);
};






