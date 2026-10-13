using System.Collections.Generic;
using IOM.Api.Resources;
using IOM.Core.Models;
using Riok.Mapperly.Abstractions;

namespace IOM.Api.Mapping;

[Mapper]
public partial class UserMapper
{
    [MapperIgnoreSource(nameof(User.Password))]
    [MapperIgnoreSource(nameof(User.CreatedById))]
    [MapperIgnoreSource(nameof(User.UpdatedById))]
    [MapperIgnoreSource(nameof(User.UpdatedDate))]
    public partial UserResource ToResource(User user);

    public partial IEnumerable<UserResource> ToResource(IEnumerable<User> users);
}
