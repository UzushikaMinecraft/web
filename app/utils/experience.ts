export class Experience {
    public size: number;

    constructor(size: number) {
        this.size = size;
    }

    public increase(i: number): void {
        this.size += i;
    }

    public decrease(d: number): void {
        this.size -= d;
    }

    public set(s: number): void {
        this.size = s;
    }

    public getSize(): number {
        return this.size;
    }

    // 現在のレベルを取得するメソッド
    public getCurrentLevel(): number {
        let level = 0;
        let xp = Math.floor(this.size);
        while (xp >= this.getExperienceForLevel(level + 1)) {
            level++;
        }
        return level;
    }

    // 特定レベルに必要な経験値を取得するメソッド
    public getExperienceForLevel(level: number): number {
        // Minecraftの経験値の計算式
        if (level < 0) return 0;
        if (level <= 16) return level * level + 2 * level;
        if (level <= 31) return Math.floor(0.5 * level * level + 40.5 * level - 194);
        return Math.floor(1.5 * level * level - 40.5 * level + 360);
    }

    // 現在のレベルでの経験値を取得するメソッド
    public getExperienceForCurrentLevel(): number {
        const currentLevel = this.getCurrentLevel();
        const currentLevelExp = this.getExperienceForLevel(currentLevel);
        return this.size - currentLevelExp;
    }

    // レベルアップに必要な経験値を取得するメソッド
    public getExperienceToLevelUp(): number {
        const currentLevel = this.getCurrentLevel();
        const nextLevelExp = this.getExperienceForLevel(currentLevel + 1);
        return nextLevelExp - this.size;
    }

    // レベルアップまでのパーセンテージを取得するメソッド
    public getPercentageToNextLevel(): number {
        const currentLevel = this.getCurrentLevel();
        const currentLevelExp = this.getExperienceForLevel(currentLevel);
        const nextLevelExp = this.getExperienceForLevel(currentLevel + 1);
        const progress = (this.size - currentLevelExp) / (nextLevelExp - currentLevelExp) * 100;
        return Math.min(progress, 100.0); // パーセンテージが100%を超えないように
    }

    // プログレスバーを文字列として返すメソッド
    public getProgressBar(barLength: number): string {
        const totalBars = barLength; // バーの長さ
        const percentage = this.getPercentageToNextLevel();
        const filledBars = Math.round(totalBars * (percentage / 100.0)); // 塗りつぶされたバーの数

        let sb = '';
        for (let i = 0; i < totalBars; i++) {
            if (i < filledBars) {
                sb += '🟩';
            } else {
                sb += '⬛';
            }
        }
        return sb;
    }
}

