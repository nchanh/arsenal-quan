<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserRole extends Enum
{
  const ADMIN_SYSTEM = 1;
  const MODERATOR  = 2;
  const EDITOR = 3;
  const MEMBER = 4;
}
