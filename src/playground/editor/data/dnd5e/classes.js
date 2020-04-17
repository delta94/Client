/**
 * 职业
 */

const classes = [
  {
    name: '野蛮人 Barbarian',
    quick:
      '你可以按以下建议快速创建一名野蛮人。首先，将你最高的属性分配给力量，次高的分配给体质。然后选择化外之民背景。',
    hp: ['每野蛮人等级 1d12', '12＋你的体质调整值', '首级生命值之外，对应每个野蛮人等级 7（1d12）＋你的体质调整值'],
    proficiencies: [
      '轻甲、中甲、盾牌',
      '简易武器、军用武器',
      '无',
      '力量、体质',
      '从驯兽、运动、威吓、自然、察觉和求生中选两项',
    ],
    // 你带着以下装备开始游戏，此外该角色还可以从其背景项中获得额外的起始装备：
    equipment: [
      '(a）一把巨斧或（b）任意一把军用近战武器',
      '（a）两把手斧或（b）任意一把简易武器',
      '一个探索套组和四支标枪',
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '狂暴次数', '狂暴伤害'],
      ['1st', '+2', '狂暴，无甲防御', '2', '+2'],
      ['2nd', '+2', '鲁莽攻击，险境感ऽ', '2', '+2'],
      ['3rd', '+2', '选择原初道途', '3', '+2'],
      ['4th', '+2', '属性值提升', '3', '+2'],
      ['5th', '+3', '额外攻击，快速移动', '3', '+2'],
      ['6th', '+3', '道途特性', '4', '+2'],
      ['7th', '+3', '野性फ觉', '4', '+2'],
      ['8th', '+3', '属性值提升', '4', '+2'],
      ['9th', '+4', '凶蛮重击（1 骰）', '4', '+3'],
      ['10th', '+4', '道途特性', '4', '+3'],
      ['11th', '+4', '坚韧狂暴', '4', '+3'],
      ['12th', '+4', '属性值提升', '5', '+3'],
      ['13th', '+5', '凶蛮重击（2 骰）', '5', '+3'],
      ['14th', '+5', '道途特性', '5', '+3'],
      ['15th', '+5', '持久狂暴', '5', '+3'],
      ['16th', '+5', '属性值提升', '5', '+4'],
      ['17th', '+6', '凶蛮重击（3 骰）', '6', '+4'],
      ['18th', '+6', '不屈勇武', '6', '+4'],
      ['19th', '+6', '属性值提升', '6', '+4'],
      ['20th', '+6', '原初斗士', '无限', '+4'],
    ],
  },
  {
    name: '吟游诗人 Bard',
    quick:
      '你可以按以下建议快速创建一名吟游诗人。首先，将最高属性分配给魅力，次高属性分配给敏捷。然后选择艺人背景。最后选择戏法舞光术dancing light 和恶言相加vicious mockery，选择 1 环法术魅惑人类 charm person、侦测魔法 detect magic、治愈真言 healing word 和雷鸣波 thunderwave。',
    hp: ['每吟游诗人等级 1d8', '8＋你的体质调整值', '首级生命值外，对应每个吟游诗人等级 5（1d8）＋你的体质调整值'],
    proficiencies: ['轻甲', '简易武器、手弩、长剑、刺剑、短剑', '自选三种乐器', '敏捷、魅力', '自选三项技能'],
    equipment: [
      '（a）一把刺剑，（b）一把长剑或（c）任一把简易武器',
      '（a）一个大使套组或（b）一个艺人套组',
      '（a）一个鲁特琴或（b）其它乐器',
      '皮甲和一把匕首',
    ],
    table: [
      [
        '职业等级',
        '熟练加值',
        '职业特性',
        '已知戏法',
        '已知法术',
        '1环',
        '2环',
        '3环',
        '4环',
        '5环',
        '6环',
        '7环',
        '8环',
        '9环',
      ],
      ['1st', '+2', '施法，诗人激励(d6)', '2', '4', '2', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['2nd', '+2', '万事通，休憩曲(d6)', '2', '5', '3', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['3rd', '+2', '选择诗人学院，专精', '2', '6', '4', '2', '—', '—', '—', '—', '—', '—', '—'],
      ['4th', '+2', '属性值提升', '3', '7', '4', '3', '—', '—', '—', '—', '—', '—', '—'],
      ['5th', '+3', '诗人激励(d8)，激励之源', '3', '8', '4', '3', '2', '—', '—', '—', '—', '—', '—'],
      ['6th', '+3', '反迷惑，学院特性', '3', '9', '4', '3', '3', '—', '—', '—', '—', '—', '—'],
      ['7th', '+3', '—', '3', '10', '4', '3', '3', '1', '—', '—', '—', '—', '—'],
      ['8th', '+3', '属性值提升', '3', '11', '4', '3', '3', '2', '—', '—', '—', '—', '—'],
      ['9th', '+4', '休憩曲(d8)', '3', '12', '4', '3', '3', '3', '1', '—', '—', '—', '—'],
      ['10th', '+4', '诗人激励(d10)，专精，魔法奥秘', '4', '14', '4', '3', '3', '3', '2', '—', '—', '—', '—'],
      ['11th', '+4', '—', '4', '15', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['12th', '+4', '属性值提升', '4', '15', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['13th', '+5', '休憩曲(d10) ', '4', '16', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['14th', '+5', '魔法奥秘，学院特性', '4', '18', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['15th', '+5', '诗人激励(d12)', '4', '19', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['16th', '+5', '属性值提升', '4', '19', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['17th', '+6', '休憩曲(d12)', '4', '20', '4', '3', '3', '3', '2', '1', '1', '1', '1'],
      ['18th', '+6', '魔法奥秘', '4', '22', '4', '3', '3', '3', '3', '1', '1', '1', '1'],
      ['19th', '+6', '属性值提升', '4', '22', '4', '3', '3', '3', '3', '2', '1', '1', '1'],
      ['20th', '+6', '先发激励', '4', '22', '4', '3', '3', '3', '3', '2', '2', '1', '1'],
    ],
  },
  {
    name: '牧师 Cleric',
    quick: '你可以按以下建议快速创建一名牧师。首先，你将最高属性分配给感知，次高分配给力量或体质。然后选择侍僧背景。',
    hp: ['每牧师等级 1d8', '8＋你的体质调整值', '首级生命值之外，对应每个牧师等级 5（1d8）＋ 你的体质调整值'],
    proficiencies: ['轻甲、中甲、盾牌', '简易武器', '无', '感知、魅力', '从历史、洞悉、医药、游说和宗教中选择两项'],
    equipment: [
      '（a）一把硬头锤或（b）一把战锤（拥有熟练项时可选）',
      '（a）鳞甲，（b）皮甲或（c）链甲（拥有熟练项时可选）',
      '（a）一把轻弩和 20 支弩矢或（b）任意简易武器',
      '（a）一个祭司套组或（b）一个探索套组',
      '一个盾牌和一个圣徽',
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '已知戏法', '1环', '2环', '3环', '4环', '5环', '6环', '7环', '8环', '9环'],
      ['1st', '+2', '施法，选择领域', '3', '2', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['2nd', '+2', '引导神力（1/休），领域特性', '3', '3', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['3rd', '+2', '—', '3', '4', '2', '—', '—', '—', '—', '—', '—', '—'],
      ['4th', '+2', '属性值提升', '4', '4', '3', '—', '—', '—', '—', '—', '—', '—'],
      ['5th', '+3', '摧毁不死ࣿ物（CR 1/2）', '4', '4', '3', '2', '—', '—', '—', '—', '—', '—'],
      ['6th', '+3', '引导神力（2/休），领域特性', '4', '4', '3', '3', '—', '—', '—', '—', '—', '—'],
      ['7th', '+3', '—', '4', '4', '3', '3', '1', '—', '—', '—', '—', '—'],
      ['8th', '+3', '属性值提升，摧毁不死ࣿ物（CR 1），领域特性', '4', '4', '3', '3', '2', '—', '—', '—', '—', '—'],
      ['9th', '+4', '—', '4', '4', '3', '3', '3', '1', '—', '—', '—', '—'],
      ['10th', '+4', '神圣干预', '5', '4', '3', '3', '3', '2', '—', '—', '—', '—'],
      ['11th', '+4', '摧毁不死ࣿ物（CR 2）', '5', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['12th', '+4', '属性值提升', '5', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['13th', '+5', '—', '5', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['14th', '+5', '摧毁不死ࣿ物（CR 3）', '5', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['15th', '+5', '—', '5', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['16th', '+5', '属性值提升', '5', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['17th', '+6', '摧毁不死ࣿ物（CR 4），领域特性', '5', '4', '3', '3', '3', '2', '1', '1', '1', '1'],
      ['18th', '+6', '引导神力（3/休）', '5', '4', '3', '3', '3', '3', '1', '1', '1', '1'],
      ['19th', '+6', '属性值提升', '5', '4', '3', '3', '3', '3', '2', '1', '1', '1'],
      ['20th', '+6', '神圣干预增效', '5', '4', '3', '3', '3', '3', '2', '2', '1', '1'],
    ],
  },
  {
    name: '德鲁伊 Druid',
    quick: '你可以按以下建议快速创建一名德鲁伊。首先，你将最高属性分配给感知，次高分配给体质。其次选择隐士背景。',
    hp: ['每德鲁伊等级 1d8', '8＋你的体质调整值', '首级生命值之外，对应每德鲁伊等级 5（1d8）＋ 你的体质调整值'],
    proficiencies: [
      '轻甲、中甲、盾牌（德鲁伊不能装备或使用金属质的护甲和盾）',
      '短棒、匕首、飞镖、ḷ枪、硬头锤、长棍、弯刀、镰刀、投石索、矛',
      '草药工具',
      '智力、感知',
      '从奥秘、驯兽、洞悉、医药、自然、察觉、宗教和求生中选择两项',
    ],
    equipment: [
      ['（a）一个木盾或（b）任意简易武器'],
      ['（a）一把弯刀或（b）任意简易近战武器'],
      [' 皮甲，一个探索套组和一件德鲁伊法器'],
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '已知戏法', '1环', '2环', '3环', '4环', '5环', '6环', '7环', '8环', '9环'],
      ['1st', '+2', '德鲁伊语，施法', '2', '2', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['2nd', '+2', '荒野形态，选择德鲁伊结社', '2', '3', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['3rd', '+2', '—', '2', '4', '2', '—', '—', '—', '—', '—', '—', '—'],
      ['4th', '+2', '荒野形态增效，属性值提升', '3', '4', '3', '—', '—', '—', '—', '—', '—', '—'],
      ['5th', '+3', '—', '3', '4', '3', '2', '—', '—', '—', '—', '—', '—'],
      ['6th', '+3', '结社特性', '3', '4', '3', '3', '—', '—', '—', '—', '—', '—'],
      ['7th', '+3', '—', '3', '4', '3', '3', '1', '—', '—', '—', '—', '—'],
      ['8th', '+3', '荒野形态增效，属性值提升', '3', '4', '3', '3', '2', '—', '—', '—', '—', '—'],
      ['9th', '+4', '—', '3', '4', '3', '3', '3', '1', '—', '—', '—', '—'],
      ['10th', '+4', '结社特性', '4', '4', '3', '3', '3', '2', '—', '—', '—', '—'],
      ['11th', '+4', '—', '4', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['12th', '+4', '属性值提升', '4', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['13th', '+5', '—', '4', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['14th', '+5', '结社特性', '4', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['15th', '+5', '—', '4', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['16th', '+5', '属性值提升', '4', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['17th', '+6', '—', '4', '4', '3', '3', '3', '2', '1', '1', '1', '1'],
      ['18th', '+6', '不朽身，野兽施法', '4', '4', '3', '3', '3', '3', '1', '1', '1', '1'],
      ['19th', '+6', '属性值提升', '4', '4', '3', '3', '3', '3', '2', '1', '1', '1'],
      ['20th', '+6', '大德鲁伊', '4', '4', '3', '3', '3', '3', '2', '2', '1', '1'],
    ],
  },
  {
    name: '战士 Fighter',
    quick:
      '你可以按以下建议快速创建一名战士。首先，决定你是使用近战武器还是远程武器（或是灵巧武器），并据此将你最高属性分配给力量或敏捷。次高属性分配给体质，或者智力（计划选择奥法骑士范型时）。然后选择士兵背景。',
    hp: ['每战士等级 1d10', '10＋你的体质调整值', '首级生命值之外，对应每个战士等级 6（1d10）＋ 你的体质调整值'],
    proficiencies: [
      '全部护甲、盾牌',
      '简易武器、军用武器',
      '无',
      '力量、体质',
      '从杂技、驯兽、运动、历史、洞悉、威吓、察觉和求生中选择两项',
    ],
    equipment: [
      ['（a）链甲或（b）皮甲，长弓和 20 支箭'],
      ['（a）一把军用武器和一面盾牌或（b）两把军用武器'],
      ['（a）一把轻弩和 20 支弩矢或（b）两把手斧'],
      ['（a）一个地城套组或（b）一个探索套组'],
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '狂暴次数', '狂暴伤害'],
      ['1st', '+2', '战斗风ࠀ,回气'],
      ['2nd', '+2', '动作如潮（一次）'],
      ['3rd', '+2', '武术范型'],
      ['4th', '+2', '属性值提升'],
      ['5th', '+3', '额外攻击'],
      ['6th', '+3', '属性值提升'],
      ['7th', '+3', '范型特性'],
      ['8th', '+3', '属性值提升'],
      ['9th', '+4', '不屈（一次）'],
      ['10th', '+4', '范型特性'],
      ['11th', '+4', '额外攻击（2）'],
      ['12th', '+4', '属性值提升'],
      ['13th', '+5', '不屈（两次）'],
      ['14th', '+5', '属性值提升'],
      ['15th', '+5', '范型特性'],
      ['16th', '+5', '属性值提升'],
      ['17th', '+6', '动作如潮（两次），不屈（三次）'],
      ['18th', '+6', '范型特性'],
      ['19th', '+6', '属性值提升'],
      ['20th', '+6', '额外攻击（3）'],
    ],
  },
  {
    name: '武僧 Monk',
    quick: '你可以按以下建议快速创建一名武僧。首先，将你的最高属性分配给敏捷，次高属性分配给感知。然后选择隐士背景。',
    hp: ['每武僧等级 1d8', '8＋你的体质调整值', '首级生命值之外，对应每个武僧等级 5（1d8）＋ 你的体质调整值'],
    proficiencies: [
      '无',
      '简易武器、短剑',
      '选择一种工匠工具或一种乐器',
      '力量、敏捷',
      '从体操、运动、历史、洞悉、宗教、隐匿中选择两项',
    ],
    equipment: ['（a）一把短剑或（b）任意一把简易武器', '（a）一个地城套组或（b）一个探索套组', ' 10 支飞镖'],
    table: [
      ['职业等级', '熟练加值', '武艺', '气', '无甲移动', '职业特性'],
      ['1st', '+2', '1d4', '—', '—', '无甲防御，武艺'],
      ['2nd', '+2', '1d4', '2', '+10 尺', '气，无甲移动'],
      ['3rd', '+2', '1d4', '3', '+10 尺', '选择宗派，拨挡飞弹'],
      ['4th', '+2', '1d4', '4', '+10 尺', '属性值提升，轻身坠'],
      ['5th', '+3', '1d6', '5', '+10 尺', '额外攻击，震慑拳'],
      ['6th', '+3', '1d6', '6', '+15 尺', '真气驻拳，宗派特性'],
      ['7th', '+3', '1d6', '7', '+15 尺', '反射闪避，心如止水'],
      ['8th', '+3', '1d6', '8', '+15 尺', '属性值提升'],
      ['9th', '+4', '1d6', '9', '+15 尺', '无甲移动增效'],
      ['10th', '+4', '1d6', '10', '+20 尺', '百病不侵'],
      ['11th', '+4', '1d8', '11', '+20 尺', '宗派特性'],
      ['12th', '+4', '1d8', '12', '+20 尺', '属性值提升'],
      ['13th', '+5', '1d8', '13', '+20 尺', '天语通'],
      ['14th', '+5', '1d8', '14', '+25 尺', '金刚魂'],
      ['15th', '+5', '1d8', '15', '+25 尺', '不朽身'],
      ['16th', '+5', '1d8', '16', '+25 尺', '属性值提升'],
      ['17th', '+6', '1d10', '17', '+25 尺', '宗派特性'],
      ['18th', '+6', '1d10', '18', '+30 尺', '空灵体'],
      ['19th', '+6', '1d10', '19', '+30 尺', '属性值提升'],
      ['20th', '+6', '1d10', '20', '+30 尺', '超凡入圣'],
    ],
  },
  {
    name: '圣武士 Paladin',
    quick: '你可以按以下建议创建一名圣武士。首先，将你的最高属性分配给力量，次高分配给魅力。然后选择贵族背景。',
    hp: ['每圣武士等级 1d10', '10＋你的体质调整值', '首级生命值之外，对应每个圣武士等级 6（1d10）＋你的体质调整值'],
    proficiencies: [
      '所有护甲和盾牌',
      '简易武器和军用武器',
      '无',
      '感知、魅力',
      '在运动、洞悉、威吓、医药、说服、宗教中选择两项',
    ],
    equipment: [
      '（a）一把军用武器和一面盾牌或（b）两把军用武器',
      '（a）五支标枪或（b）任意简易近战武器',
      '（a）一个祭司套组或（b）一个探索套组',
      ' 链甲和一个圣徽',
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '1环', '2环', '3环', '4环', '5环'],
      ['1st', '+2', '神圣感知，圣疗', '—', '—', '—', '—', '—'],
      ['2nd', '+2', '至圣斩，战斗风格，施法', '2', '—', '—', '—', '—'],
      ['3rd', '+2', '神佑，选择神圣誓言', '3', '—', '—', '—', '—'],
      ['4th', '+2', '属性值提升', '3', '—', '—', '—', '—'],
      ['5th', '+3', '额外攻击', '4', '2', '—', '—', '—'],
      ['6th', '+3', '守护灵光', '4', '2', '—', '—', '—'],
      ['7th', '+3', '圣誓特性', '4', '3', '—', '—', '—'],
      ['8th', '+3', '属性值提升', '4', '3', '—', '—', '—'],
      ['9th', '+4', '—', '4', '3', '2', '—', '—'],
      ['10th', '+4', '勇气灵光', '4', '3', '2', '—', '—'],
      ['11th', '+4', '精通至圣斩', '4', '3', '3', '—', '—'],
      ['12th', '+4', '属性值提升', '4', '3', '3', '—', '—'],
      ['13th', '+5', '—', '4', '3', '3', '1', '—'],
      ['14th', '+5', '净化之触', '4', '3', '3', '1', '—'],
      ['15th', '+5', '圣誓特性', '4', '3', '3', '2', '—'],
      ['16th', '+5', '属性值提升', '4', '3', '3', '2', '—'],
      ['17th', '+6', '—', '4', '3', '3', '3', '1'],
      ['18th', '+6', '灵光增效', '4', '3', '3', '3', '1'],
      ['19th', '+6', '属性值提升', '4', '3', '3', '3', '2'],
      ['20th', '+6', '圣誓特性', '4', '3', '3', '3', '2'],
    ],
  },
  {
    name: '游侠 Ranger',
    quick:
      '你可以按以下建议快速创建一名游侠。首先，将你的最高属性分配给敏捷，次高分配给感知。（一些注重双持武器战斗的游侠其力量该高于敏捷。）其次选择化外之民背景。',
    hp: ['每游侠等级 1d10', '10＋你的体质调整值', '首级生命值之外，对应每个游侠等级 6（1d10）＋你的体质调整值'],
    proficiencies: [
      '轻甲、中甲、盾牌',
      '简易武器、军用武器',
      '无',
      '力量、敏捷',
      '从驯兽、运动、洞悉、调查、自然、察觉、隐匿和求生中选择三项',
    ],
    equipment: [
      '（a）鳞甲或（b）皮甲',
      '（a）两把短剑或（b）任意两把简易武器',
      '（a）一个地城套组或（b）一个探索套组',
      '一把长弓和一个箭袋（内含 20 支箭）',
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '1环', '2环', '3环', '4环', '5环'],
      ['1st', '+2', '宿敌，自然探索者', '—', '—', '—', '—', '—', '—'],
      ['2nd', '+2', '战斗风格,施法', '2', '2', '—', '—', '—', '—'],
      ['3rd', '+2', '选择游侠范型，原初意识', '3', '3', '—', '—', '—', '—'],
      ['4th', '+2', '属性值提升', '3', '3', '—', '—', '—', '—'],
      ['5th', '+3', '额外攻击', '4', '4', '2', '—', '—', '—'],
      ['6th', '+3', '增加宿敌及偏好环境', '4', '4', '2', '—', '—', '—'],
      ['7th', '+3', '范型特性', '5', '4', '3', '—', '—', '—'],
      ['8th', '+3', '属性值提升，大地行者', '5', '4', '3', '—', '—', '—'],
      ['9th', '+4', '—', '6', '4', '3', '2', '—', '—'],
      ['10th', '+4', '增加偏好环境，遁术', '6', '4', '3', '2', '—', '—'],
      ['11th', '+4', '范型特性', '7', '4', '3', '3', '—', '—'],
      ['12th', '+4', '属性值提升', '7', '4', '3', '3', '—', '—'],
      ['13th', '+5', '—', '8', '4', '3', '3', '1', '—'],
      ['14th', '+5', '增加宿敌，无踪步', '8', '4', '3', '3', '1', '—'],
      ['15th', '+5', '范型特性', '9', '4', '3', '3', '2', '—'],
      ['16th', '+5', '属性值提升', '9', '4', '3', '3', '2', '—'],
      ['17th', '+6', '—', '10', '4', '3', '3', '3', '1'],
      ['18th', '+6', '野性感官', '10', '4', '3', '3', '3', '1'],
      ['19th', '+6', '属性值提升', '11', '4', '3', '3', '3', '2'],
      ['20th', '+6', '屠灭众敌', '11', '4', '3', '3', '3', '2'],
    ],
  },
  {
    name: '游荡者 Rogue',
    quick:
      '你可以按以下建议快速创建一名游荡者。首先，你将最高属性分配给敏捷。如果你想精于调查或者打算选择诡术师范型，则将次高属性分配给智力。如果你打算着重于骗术或者社交，则将次高属性分配给魅力。然后，选择骗子背景。',
    hp: ['每游荡者等级 1d8', '8＋你的体质调整值', '首级生命值之外，对应每个游荡者等级 5（1d8）＋你的体质调整值'],
    proficiencies: [
      '轻甲',
      '简易武器、手弩、长剑、刺剑、短剑',
      '盗贼工具',
      '敏捷、智力',
      '从体操、运动、欺瞒、洞悉、威吓、调查、察觉、表演、游说、巧手、隐匿中选择四项。',
    ],
    equipment: [
      '（a）一把刺剑或（b）一把短剑',
      '（a）一把短弓和一袋 20 支箭或（b）一把短剑',
      '（a）一个窃贼套组，（b）一个地城套组或（c）一个探索套组',
      '皮甲，两把匕首和盗贼工具',
    ],
    table: [
      ['职业等级', '熟练加值', '偷袭', '职业特性'],
      ['1st', '+2', '1d6', '专精，偷袭，盗贼黑话'],
      ['2nd', '+2', '1d6', '灵巧动作'],
      ['3rd', '+2', '2d6', '选择游荡者范型'],
      ['4th', '+2', '2d6', '属性值提升'],
      ['5th', '+3', '3d6', '直觉闪避'],
      ['6th', '+3', '3d6', '专精'],
      ['7th', '+3', '4d6', '反射闪避'],
      ['8th', '+3', '4d6', '属性值提升'],
      ['9th', '+4', '5d6', '范型特性'],
      ['10th', '+4', '5d6', '属性值提升'],
      ['11th', '+4', '6d6', '可靠才能'],
      ['12th', '+4', '6d6', '属性值提升'],
      ['13th', '+5', '7d6', '范型特性'],
      ['14th', '+5', '7d6', '听声辨位'],
      ['15th', '+5', '8d6', '圆滑心智'],
      ['16th', '+5', '8d6', '属性值提升'],
      ['17th', '+6', '9d6', '范型特性'],
      ['18th', '+6', '9d6', '飘忽不定'],
      ['19th', '+6', '10d6', '属性值提升'],
      ['20th', '+6', '10d6', '幸运一击'],
    ],
  },
  {
    name: '术士 Sorcerer',
    quick:
      '你可以按以下建议快速创建一名术士。首先，将你的最高属性分配给魅力，次高属性分配给体质。然后选择隐者背景。最后，选择戏法光亮术 light，魔法伎俩 prestidigitation，冷冻射线 ray of frost，电爪 shocking grasp，以及 1 环法术护盾术shield 和魔法飞弹 magic missile。',
    hp: ['每术士等级 1d6', '6＋你的体质调整值', '首级生命值之外，对应每一个术士等级 4（1d6）＋你的体质调整值'],
    proficiencies: [
      '无',
      '匕首、飞镖、投石索、长棍、轻弩',
      '无',
      '体质、魅力',
      '从奥秘、欺瞒、洞悉、威吓、游说、宗教中选择两项',
    ],
    equipment: [
      '（a）一把轻弩与 20 支弩矢或（b）任意一件简单武器',
      '（a）一个材料包或（b）一件奥术法器',
      '（a）一个地城套组或（b）一个探索套组',
      '两把匕首',
    ],
    table: [
      [
        '职业等级',
        '熟练加值',
        '术法点',
        '职业特性',
        '已知戏法',
        '已知法术',
        '1环',
        '2环',
        '3环',
        '4环',
        '5环',
        '6环',
        '7环',
        '8环',
        '9环',
      ],
      ['1st', '+2', '—', '施法，术法起源', '4', '2', '2', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['2nd', '+2', '2', '魔力泉涌', '4', '3', '3', '—', '—', '—', '—', '—', '—', '—', '—'],
      ['3rd', '+2', '3', '超魔法', '4', '4', '4', '2', '—', '—', '—', '—', '—', '—', '—'],
      ['4th', '+2', '4', '属性值提升', '5', '5', '4', '3', '—', '—', '—', '—', '—', '—', '—'],
      ['5th', '+3', '5', '—', '5', '6', '4', '3', '2', '—', '—', '—', '—', '—', '—'],
      ['6th', '+3', '6', '术法起源特性', '5', '7', '4', '3', '3', '—', '—', '—', '—', '—', '—'],
      ['7th', '+3', '7', '—', '5', '8', '4', '3', '3', '1', '—', '—', '—', '—', '—'],
      ['8th', '+3', '8', '属性值提升', '5', '9', '4', '3', '3', '2', '—', '—', '—', '—', '—'],
      ['9th', '+4', '9', '—', '5', '10', '4', '3', '3', '3', '1', '—', '—', '—', '—'],
      ['10th', '+4', '10', '超魔法', '6', '11', '4', '3', '3', '3', '2', '—', '—', '—', '—'],
      ['11th', '+4', '11', '—', '6', '12', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['12th', '+4', '12', '属性值提升', '6', '12', '4', '3', '3', '3', '2', '1', '—', '—', '—'],
      ['13th', '+5', '13', '—', '6', '13', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['14th', '+5', '14', '术法起源特性', '6', '13', '4', '3', '3', '3', '2', '1', '1', '—', '—'],
      ['15th', '+5', '15', '—', '6', '14', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['16th', '+5', '16', '属性值提升', '6', '14', '4', '3', '3', '3', '2', '1', '1', '1', '—'],
      ['17th', '+6', '17', '超魔法', '6', '15', '4', '3', '3', '3', '2', '1', '1', '1', '1'],
      ['18th', '+6', '18', '术法起源特性', '6', '15', '4', '3', '3', '3', '3', '1', '1', '1', '1'],
      ['19th', '+6', '19', '属性值提升', '6', '15', '4', '3', '3', '3', '3', '2', '1', '1', '1'],
      ['20th', '+6', '20', '术法复苏', '6', '15', '4', '3', '3', '3', '3', '2', '2', '1', '1'],
    ],
  },
  {
    name: '邪术师 Warlock',
    quick:
      '你可以按以下建议快速创建一名邪术师。首先，将你的最高属性分配给魅力，次高分配给体质。然后选择骗子背景。最后，选择戏法魔能爆 eldritch blast 和冻寒之触 chill touch，再选择 1 环法术魅惑人类 charm person 和巫术箭 witch bolt。',
    hp: ['每邪术师等级 1d8', '8＋你的体质调整值', '首级生命值之外，对应每个邪术师等级 5（1d8）＋你的体质调整值'],
    proficiencies: ['轻甲', '简易武器', '无', '感知，魅力', '从奥秘、欺瞒、威吓、洞悉、历史、自然、宗教中选择两项'],
    equipment: [
      '（a）一把轻弩和 20 支弩矢或（b）任意一把简易武器',
      '（a）一个材料包或（b）一件奥术法器',
      '（a）一个学者套组或（b）一个地城套组',
      ' 皮甲、任意简易武器和两把匕首',
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '已知戏法', '已知法术', '法术位', '法术位环阶', '已知祈唤'],
      ['1st', '+2', '选择异उ宗主，契约魔法', '2', '2', '1', '1 环', '—'],
      ['2nd', '+2', '魔能祈唤', '2', '3', '2', '1 环', '2'],
      ['3rd', '+2', '契约之赐', '2', '4', '2', '2 环', '2'],
      ['4th', '+2', '属性值提升', '3', '5', '2', '2 环', '2'],
      ['5th', '+3', '—', '3', '6', '2', '3 环', '3'],
      ['6th', '+3', '异界宗主特性', '3', '7', '2', '3 环', '3'],
      ['7th', '+3', '—', '3', '8', '2', '4 环', '4'],
      ['8th', '+3', '属性值提升', '3', '9', '2', '4 环', '4'],
      ['9th', '+4', '—', '3', '10', '2', '5 环', '5'],
      ['10th', '+4', '异उ宗主特性', '4', '10', '2', '5 环', '5'],
      ['11th', '+4', '玄奥秘法（6 环）', '4', '11', '3', '5 环', '5'],
      ['12th', '+4', '属性值提升', '4', '11', '3', '5 环', '6'],
      ['13th', '+5', '玄奥秘法（7 环）', '4', '12', '3', '5 环', '6'],
      ['14th', '+5', '异उ宗主特性', '4', '12', '3', '5 环', '6'],
      ['15th', '+5', '玄奥秘法（8 环）', '4', '13', '3', '5 环', '7'],
      ['16th', '+5', '属性值提升', '4', '13', '3', '5 环', '7'],
      ['17th', '+6', '玄奥秘法（9 环）', '4', '14', '4', '5 环', '7'],
      ['18th', '+6', '—', '4', '14', '4', '5 环', '8'],
      ['19th', '+6', '属性值提升', '4', '15', '4', '5 环', '8'],
      ['20th', '+6', '魔能掌控', '4', '15', '4', '5 环', '8'],
    ],
  },
  {
    name: '法师 Wizard',
    quick:
      '你可以按以下建议快速构建一名法师。首先，将你的最高属性分配给智力，次高属性分配给体质和敏捷。然后选择智者背景。最后，选择戏法光亮术 light，法师之手 mage hand 和冷冻射线 ray of frost，以及 1 环法术燃烧之手 burning hands，魅惑人类 charm person，羽落术 feather fall，法师护甲 mage armor，魔法飞弹 magic missile 和睡眠术 sleep，并将其加入法术书。',
    hp: ['每法师等级 1d6', '6＋你的体质调整值', '首级生命值之外，对应每个法师等级 4（1d6）＋ 你的体质调整值'],
    proficiencies: [
      '无',
      '匕首、飞镖、投石索、长棍、轻弩',
      '无',
      '智力、感知',
      '在奥秘、历史、洞悉、调查、医药、宗教中选择两项',
    ],
    equipment: [
      ['（a）一根长棍或（b）一把匕首'],
      ['（a）一个材料包或（b）一件奥术法器'],
      ['（a）一个学者套组或（b）一个探索套组'],
      [' 一本法术书'],
    ],
    table: [
      ['职业等级', '熟练加值', '职业特性', '已知戏法', '1环', '2环', '3环', '4环', '5环', '6环', '7环', '8环', '9环'],
      ['1st', '+2', '施法，奥术回想', '3', '2', '－', '－', '－', '－', '－', '－', '－', '－'],
      ['2nd', '+2', '选择奥术传承', '3', '3', '－', '－', '－', '－', '－', '－', '－', '－'],
      ['3rd', '+2', '－', '3', '4', '2', '－', '－', '－', '－', '－', '－', '－'],
      ['4th', '+2', '属性值提升', '4', '4', '3', '－', '－', '－', '－', '－', '－', '－'],
      ['5th', '+3', '－', '4', '4', '3', '2', '－', '－', '－', '－', '－', '－'],
      ['6th', '+3', '奥术传承特性', '4', '4', '3', '3', '－', '－', '－', '－', '－', '－'],
      ['7th', '+3', '－', '4', '4', '3', '3', '1', '－', '－', '－', '－', '－'],
      ['8th', '+3', '属性值提升', '4', '4', '3', '3', '2', '－', '－', '－', '－', '－'],
      ['9th', '+4', '－', '4', '4', '3', '3', '3', '1', '－', '－', '－', '－'],
      ['10th', '+4', '奥术传承特性', '5', '4', '3', '3', '3', '2', '－', '－', '－', '－'],
      ['11th', '+4', '－', '5', '4', '3', '3', '3', '2', '1', '－', '－', '－'],
      ['12th', '+4', '属性值提升', '5', '4', '3', '3', '3', '2', '1', '－', '－', '－'],
      ['13th', '+5', '－', '5', '4', '3', '3', '3', '2', '1', '1', '－', '－'],
      ['14th', '+5', '奥术传܈特性', '5', '4', '3', '3', '3', '2', '1', '1', '－', '－'],
      ['15th', '+5', '－', '5', '4', '3', '3', '3', '2', '1', '1', '1', '－'],
      ['16th', '+5', '属性值提升', '5', '4', '3', '3', '3', '2', '1', '1', '1', '－'],
      ['17th', '+6', '－', '5', '4', '3', '3', '3', '2', '1', '1', '1', '1'],
      ['18th', '+6', '法术精通', '5', '4', '3', '3', '3', '3', '1', '1', '1', '1'],
      ['19th', '+6', '属性值提升', '5', '4', '3', '3', '3', '3', '2', '1', '1', '1'],
      ['20th', '+6', '招牌法术', '5', '4', '3', '3', '3', '3', '2', '2', '1', '1'],
    ],
  },
];
