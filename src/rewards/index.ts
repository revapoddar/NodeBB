//JAVASCRIPT
// 'use strict';

// const util = require('util');

// const db = require('../database');
// const plugins = require('../plugins');

// const rewards = module.exports;


//TYPESCRIPT: 
'use strict';

import * as util from 'util';
import * as db from '../database';
import * as plugins from '../plugins';

export const rewards: any = {};


//JAVASCRIPT
// rewards.checkConditionAndRewardUser = async function (params) {
//     const { uid, condition, method } = params;
//     const isActive = await isConditionActive(condition);
//     if (!isActive) {
//         return;
//     }
//     const ids = await getIDsByCondition(condition);
//     let rewardData = await getRewardDataByIDs(ids);
//     rewardData = await filterCompletedRewards(uid, rewardData);
//     rewardData = rewardData.filter(Boolean);
//     if (!rewardData || !rewardData.length) {
//         return;
//     }
//     const eligible = await Promise.all(rewardData.map(reward => checkCondition(reward, method)));
//     const eligibleRewards = rewardData.filter((reward, index) => eligible[index]);
//     await giveRewards(uid, eligibleRewards);
// };


//TYPESCRIPT: 
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


//JAVASCRIPT
// async function isConditionActive(condition) {
//     return await db.isSetMember('conditions:active', condition);
// }



//TYPESCRIPT: 
async function isConditionActive(condition: string): Promise<boolean> {
    return await db.isSetMember('conditions:active', condition);
}

//JAVASCRIPT
// async function getIDsByCondition(condition) {
//     return await db.getSetMembers(`condition:${condition}:rewards`);
// }

//TYPESCRIPT: 
async function getIDsByCondition(condition: string): Promise<string[]> {
    return await db.getSetMembers(`condition:${condition}:rewards`);
}


//JAVASCRIPT
// async function filterCompletedRewards(uid, rewards) {
//     const data = await db.getSortedSetRangeByScoreWithScores(`uid:${uid}:rewards`, 0, -1, 1, '+inf');
//     const userRewards = {};

//     data.forEach((obj) => {
//         userRewards[obj.value] = parseInt(obj.score, 10);
//     });

//     return rewards.filter((reward) => {
//         if (!reward) {
//             return false;
//         }

//         const claimable = parseInt(reward.claimable, 10);
//         return claimable === 0 || (!userRewards[reward.id] || userRewards[reward.id] < reward.claimable);
//     });
// }


//TYPESCRIPT: 
async function filterCompletedRewards(uid: string, rewards: any[]): Promise<any[]> {
    const data = await db.getSortedSetRangeByScoreWithScores(`uid:${uid}:rewards`, 0, -1, 1, '+inf');
    const userRewards: { [key: string]: number } = {};

    data.forEach((obj: any) => {
        userRewards[obj.value] = parseInt(obj.score, 10);
    });

    return rewards.filter((reward) => {
        if (!reward) {
            return false;
        }

        const claimable = parseInt(reward.claimable, 10);
        return claimable === 0 || (!userRewards[reward.id] || userRewards[reward.id] < reward.claimable);
    });

}


//JAVASCRIPT
// async function getRewardDataByIDs(ids) {
//     return await db.getObjects(ids.map(id => `rewards:id:${id}`));
// }


//TYPESCRIPT
async function getRewardDataByIDs(ids: any): Promise<any> {
    return await db.getObjects(ids.map(id => `rewards:id:${id}`));
}


//JAVASCRIPT
// async function getRewardsByRewardData(rewards) {
//     return await db.getObjects(rewards.map(reward => `rewards:id:${reward.id}:rewards`));
// }


//TYPESCRIPT
async function getRewardsByRewardData(rewards: any[]): Promise<any> {
    return await db.getObjects(rewards.map(reward => `rewards:id:${reward.id}:rewards`));
}



//JAVASCRIPT: 
// async function checkCondition(reward, method) {
//     if (method.constructor && method.constructor.name !== 'AsyncFunction') {
//         method = util.promisify(method);
//     }
//     const value = await method();
//     const bool = await plugins.hooks.fire(`filter:rewards.checkConditional:${reward.conditional}`, { left: value, right: reward.value });
//     return bool;
// }

//TYPESCRIPT: 
async function checkCondition(reward: any, method: any): Promise<boolean> {
    if (method.constructor && method.constructor.name !== 'AsyncFunction') {
        method = util.promisify(method);
    }
    const value = await method();
    const bool = await plugins.hooks.fire(`filter:rewards.checkConditional:${reward.conditional}`, { left: value, right: reward.value });
    return bool;
}

//JAVASCRIPT:
// async function giveRewards(uid, rewards) {
//     const rewardData = await getRewardsByRewardData(rewards);
//     for (let i = 0; i < rewards.length; i++) {
//         /* eslint-disable no-await-in-loop */
//         await plugins.hooks.fire(`action:rewards.award:${rewards[i].rid}`, { uid: uid, reward: rewardData[i] });
//         await db.sortedSetIncrBy(`uid:${uid}:rewards`, 1, rewards[i].id);
//     }
// }

// require('../promisify')(rewards);


//TYPESCRIPT: 
async function giveRewards(uid: string, rewards: any[]): Promise<void> {
    const rewardData = await getRewardsByRewardData(rewards);
    for (let i = 0; i < rewards.length; i++) {
        await plugins.hooks.fire(`action:rewards.award:${rewards[i].rid}`, { uid: uid, reward: rewardData[i] });
        await db.sortedSetIncrBy(`uid:${uid}:rewards`, 1, rewards[i].id);
    }
}

require('../promisify')(rewards);


















