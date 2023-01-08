import { Expose } from "class-transformer";
import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    const options = {
      local: `${process.env.APP_API_URL}/avatar/${this.avatar}`,
      s3: `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`,
    };

    return options[process.env.disk] ?? null;
  }

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { User };
