//JAVASCRIPT
// 'use strict';
// const util = require('util');
// const db = require('../database');
// const plugins = require('../plugins');
// const rewards = module.exports;
//TYPESCRIPT: 
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewards = void 0;
const util = __importStar(require("util"));
const db = __importStar(require("../database"));
const plugins = __importStar(require("../plugins"));
exports.rewards = {};
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
exports.rewards.checkConditionAndRewardUser = function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, condition, method } = params;
        const isActive = yield isConditionActive(condition);
        if (!isActive) {
            return;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        }
        const ids = yield getIDsByCondition(condition);
        let rewardData = yield getRewardDataByIDs(ids);
        rewardData = yield filterCompletedRewards(uid, rewardData);
        rewardData = rewardData.filter(Boolean);
        if (!rewardData || !rewardData.length) {
            return;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        }
        const eligible = yield Promise.all(rewardData.map(reward => checkCondition(reward, method)));
        const eligibleRewards = rewardData.filter((reward, index) => eligible[index]);
        yield giveRewards(uid, eligibleRewards);
    });
};
//JAVASCRIPT
// async function isConditionActive(condition) {
//     return await db.isSetMember('conditions:active', condition);
// }
//TYPESCRIPT: 
function isConditionActive(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.isSetMember('conditions:active', condition);
    });
}
//JAVASCRIPT
// async function getIDsByCondition(condition) {
//     return await db.getSetMembers(`condition:${condition}:rewards`);
// }
//TYPESCRIPT: 
function getIDsByCondition(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.getSetMembers(`condition:${condition}:rewards`);
    });
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
function filterCompletedRewards(uid, rewards) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield db.getSortedSetRangeByScoreWithScores(`uid:${uid}:rewards`, 0, -1, 1, '+inf');
        const userRewards = {};
        data.forEach((obj) => {
            userRewards[obj.value] = parseInt(obj.score, 10);
        });
        return rewards.filter((reward) => {
            if (!reward) {
                return false;
            }
            const claimable = parseInt(reward.claimable, 10);
            return claimable === 0 || (!userRewards[reward.id] || userRewards[reward.id] < reward.claimable);
        });
    });
}
//JAVASCRIPT
// async function getRewardDataByIDs(ids) {
//     return await db.getObjects(ids.map(id => `rewards:id:${id}`));
// }
//TYPESCRIPT
function getRewardDataByIDs(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.getObjects(ids.map(id => `rewards:id:${id}`));
    });
}
//JAVASCRIPT
// async function getRewardsByRewardData(rewards) {
//     return await db.getObjects(rewards.map(reward => `rewards:id:${reward.id}:rewards`));
// }
//TYPESCRIPT
function getRewardsByRewardData(rewards) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.getObjects(rewards.map(reward => `rewards:id:${reward.id}:rewards`));
    });
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
function checkCondition(reward, method) {
    return __awaiter(this, void 0, void 0, function* () {
        if (method.constructor && method.constructor.name !== 'AsyncFunction') {
            method = util.promisify(method);
        }
        const value = yield method();
        const bool = yield plugins.hooks.fire(`filter:rewards.checkConditional:${reward.conditional}`, { left: value, right: reward.value });
        return bool;
    });
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
function giveRewards(uid, rewards) {
    return __awaiter(this, void 0, void 0, function* () {
        const rewardData = yield getRewardsByRewardData(rewards);
        for (let i = 0; i < rewards.length; i++) {
            yield plugins.hooks.fire(`action:rewards.award:${rewards[i].rid}`, { uid: uid, reward: rewardData[i] });
            yield db.sortedSetIncrBy(`uid:${uid}:rewards`, 1, rewards[i].id);
        }
    });
}
require('../promisify')(exports.rewards);
